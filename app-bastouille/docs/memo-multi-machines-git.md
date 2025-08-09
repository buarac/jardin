# Petit mémo “multi‑machines” — Git sans prise de tête

> Objectif : éviter les conflits quand tu alternes entre Mac mini, MacBook et le NUC.

---

## 1) Vocabulaire simple
- **Dépôt distant** (`origin`) : ton repo GitHub.
- **Branche locale** : ta copie modifiable (ex: `main`, `feature/tv-splash`).
- **Fast‑forward** : mise à jour simple de ta branche locale vers le dernier commit du distant (pas de merge).
- **Detached HEAD** : tu as “visité” un commit ou un tag sans être sur une branche. C’est OK pour lire, pas pour développer.

---

## 2) Pré‑requis (à faire une fois par machine)
```bash
git config --global user.name  "Ton Nom"
git config --global user.email "toi@example.com"
git remote -v            # doit montrer origin -> https://github.com/buarac/jardin.git
```

---

## 3) Routine **avant de quitter** une machine
1. **Vérifie l’état** : `git status`
   - S’il y a des fichiers modifiés non commités : `git add -A && git commit -m "WIP: en cours"`
   - Si tu ne veux pas committer : `git stash -u` (sauve temporairement tes modifs locales)
2. **Mets `main` à jour et pousse** :
   ```bash
   git switch main
   git pull --ff-only
   git push
   ```
3. **Optionnel** : tagger une version si c’est un jalon
   ```bash
   git tag -a vX.Y.Z -m "release: vX.Y.Z"
   git push origin vX.Y.Z
   ```

---

## 4) Routine **en arrivant** sur une autre machine
1. **Se placer dans le repo** puis :
   ```bash
   git fetch --all --tags
   git status            # vérifie qu'il n'y a rien de local en attente
   git switch main
   git pull --ff-only
   ```
2. **Si `git pull` refuse (branches divergentes)** :
   - Tu as probablement des commits locaux ou un rebase resté ouvert.
   - Solution la plus simple :
     ```bash
     git rebase --abort  # si un rebase était en cours
     git stash -u        # mets de côté tes modifs locales
     git pull --ff-only  # récupère proprement la dernière version
     git stash pop       # réapplique tes modifs (résous les conflits si besoin)
     ```

---

## 5) Développer proprement (petites branches)
```bash
git switch -c feature/mobile-capture
# ... tu codes ...
git add -A
git commit -m "feat(mobile): capture appareil photo"
git push -u origin feature/mobile-capture
# (PR/Merge ou rebase/squash selon ton flow)
```

Repasser ensuite sur `main` et se remettre à jour :
```bash
git switch main
git pull --ff-only
```

---

## 6) Cas fréquents & sorties de secours

### a) “Your local changes would be overwritten by checkout”
Tu as des modifs locales. Choisis :
- **Sauver temporairement** : `git stash -u`
- **Jeter les modifs** : `git restore --staged . && git checkout -- .` (dangereux)
- **Commiter** : `git add -A && git commit -m "WIP"`

### b) “detached HEAD” après `git checkout v1.2.3`
Normal : tu es sur un **tag**. Pour revenir au travail normal :
```bash
git switch main
```

### c) “Need to specify how to reconcile divergent branches” sur `git pull`
Configure ton mode préféré (une fois par machine) :
```bash
# Tirage simple “merge” (par défaut Git récent demande de choisir)
git config --global pull.rebase false

# ou tirage en rebase
# git config --global pull.rebase true

# ou n’accepter que les fast-forward (propre mais exigeant)
# git config --global pull.ff only
```

### d) Rebase qui coince
```bash
git rebase --abort
```

### e) Fichiers générés supprimés par `git clean -fd`
Normal : `git clean -fd` supprime **tout** ce qui n’est pas suivi par Git (ex: `public/` si ignoré).  
Refais ton **prebuild** ou relance `npm run dev`/`npm run build` selon ton setup.

### f) Forcer la vérité d’une machine “saine” vers GitHub
Sur la machine **qui a la bonne version** :
```bash
git switch main
git fetch origin
git status                 # propre ?
git log --oneline -n 1     # note le commit “bon”
git push --force-with-lease origin main
```
*(Le `--force-with-lease` protège contre l’écrasement si quelqu’un a poussé entre‑temps.)*

---

## 7) Déployer une **release taggée** sur le NUC
```bash
git fetch --all --tags
git checkout vX.Y.Z    # detached HEAD, OK pour déployer
npm ci                 # install propre
npm run build
pm2 restart jardin     # ou ton script de démarrage
```
Revenir en mode dev sur le NUC :
```bash
git switch main
git pull --ff-only
```

---

## 8) Mémo commandes utiles
```bash
# Voir où tu es
git status
git branch -vv
git log --oneline -n 5

# Mettre à jour depuis GitHub
git fetch --all --tags
git pull --ff-only

# Créer une branche, pousser
git switch -c feature/xyz
git push -u origin feature/xyz

# Sauver temporairement tes modifs
git stash -u
git stash list
git stash pop

# Tagger une release
git tag -a v1.2.3 -m "release: v1.2.3"
git push origin v1.2.3

# Forcer (en sécurité relative)
git push --force-with-lease origin main
```

---

## 9) Script de vérification “état Git” (optionnel)
Crée `scripts/check-git-state.sh` et rends‑le exécutable (`chmod +x scripts/check-git-state.sh`) :
```bash
#!/usr/bin/env bash
set -e

echo "📍 Repo : $(basename "$(git rev-parse --show-toplevel)")"
echo "🪵 Branche locale : $(git rev-parse --abbrev-ref HEAD)"
echo "☁️  Distant : $(git remote get-url origin)"

git fetch -q
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "no-upstream")
BASE=$(git merge-base @ @{u} 2>/dev/null || echo "no-upstream")

if [ "$REMOTE" = "no-upstream" ] || [ "$BASE" = "no-upstream" ]; then
  echo "❓ Pas d'upstream configuré pour cette branche."
else
  if [ "$LOCAL" = "$REMOTE" ]; then
    echo "✅ Ta branche est synchro avec origin."
  elif [ "$LOCAL" = "$BASE" ]; then
    echo "⬇️  Tu dois tirer : git pull --ff-only"
  elif [ "$REMOTE" = "$BASE" ]; then
    echo "⬆️  Tu dois pousser : git push"
  else
    echo "⚠️  Ta branche a divergé (rebase/merge nécessaire)."
  fi
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "📝 Tu as des changements locaux non commités."
else
  echo "🧼 Rien à committer localement."
fi
```

---

### Rappel mental
- **Avant de quitter** : `git status` → `git add/commit` **ou** `git stash` → `git switch main` → `git pull --ff-only` → `git push`  
- **En arrivant** : `git fetch --all --tags` → `git switch main` → `git pull --ff-only`

Bon flow 🔁, moins de sueur 😅.
