# Git – Mémo Multi-Machines (Mac mini, MacBook, NUC)

## Routine quotidienne

### 1) Synchroniser avant de bosser
```bash
git checkout main
git fetch origin
git pull --ff-only origin main
```

### 2) Créer ou reprendre une feature
```bash
git checkout -b feat/<sujet-court>   # ex: feat/tv-navigation
# coder...
git add -A
git commit -m "feat(tv): navigation clavier"
git push -u origin feat/<sujet-court>
```

### 3) Stopper proprement (avant de changer de machine)
```bash
git add -A
git commit -m "chore: WIP sauvegarde intermédiaire"
git push
```

---

## Continuer une feature sur une autre machine
```bash
git fetch origin
git checkout feat/<sujet-court>
git pull --ff-only
# coder...
git add -A && git commit -m "fix(tv): focus visuel"
git push
```

---

## Garder la feature à jour avec main (rebase)
```bash
git checkout feat/<sujet-court>
git fetch origin
git rebase origin/main
# si conflits → corriger, puis :
git add -A
git rebase --continue
git push --force-with-lease
```

---

## Finaliser : merger la feature

### Option A (GitHub PR)
- PR `feat/<sujet>` → `main`
- Squash & merge

Puis sur toutes les machines :
```bash
git checkout main
git pull --ff-only origin main
git branch -d feat/<sujet-court>
git push origin :feat/<sujet-court>
```

### Option B (en local)
```bash
git checkout main
git pull --ff-only origin main
git merge --no-ff feat/<sujet-court>
git push
git branch -d feat/<sujet-court>
git push origin :feat/<sujet-court>
```

---

## Versionner & déployer

### Créer un tag
```bash
git checkout main
git pull --ff-only origin main
git tag -a v1.2.0 -m "release: v1.2.0 mobile+tv"
git push origin v1.2.0
```

### Récupérer sur le NUC
```bash
git fetch --all --tags
git checkout v1.2.0
```

---

## Hotfix rapide
```bash
git checkout -b hotfix/<bug>
# corrige...
git add -A
git commit -m "fix: <description>"
git checkout main
git pull --ff-only origin main
git merge --no-ff hotfix/<bug>
git push
git branch -d hotfix/<bug>
```

---

## Stash temporaire
```bash
git stash push -m "WIP rapide"
git checkout main
# plus tard...
git checkout feat/<sujet>
git stash pop
```

---

## Check rapide
```bash
git status
git branch -vv
git log --oneline -n 5
git remote -v
```

---

## Règles d’or
- Toujours `git pull --ff-only` avant de coder
- Toujours push avant de changer de machine
- Une feature = une branche
- Commits fréquents et clairs
- Rebase plutôt que merge sur les features
- `git push --force-with-lease` si réécriture historique
