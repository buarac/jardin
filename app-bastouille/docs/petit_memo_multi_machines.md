# Petit mémo “multi-machines” – Git (avec branches `feature`)

## Création d’une nouvelle feature
Pour créer une nouvelle branche feature depuis `main` :
```bash
git fetch origin
git checkout main
git pull origin main
git checkout -b feature/ma-nouvelle-fonctionnalite
git push -u origin feature/ma-nouvelle-fonctionnalite
```
💡 Cela garantit que ta branche est créée à partir de la dernière version de `main`.

## 1️⃣ Avant de commencer à coder (sur n’importe quelle machine)
**Toujours** :
```bash
git fetch origin
git checkout feature/ma-fonctionnalite  # ou créer si elle n’existe pas
git pull origin feature/ma-fonctionnalite
```
💡 **Pourquoi ?**  
- `git fetch origin` : récupère les commits distants sans toucher à ton code.  
- `git pull origin feature/...` : synchronise ta branche locale avec la version distante.  
- Ça évite d’écrire du code sur une version périmée.

---

## 2️⃣ Pendant le développement
- Ajouter uniquement les fichiers utiles :
```bash
git add -A  # prend en compte ajout, modif et suppression
```
- Commit clair et fréquent :
```bash
git commit -m "feat: ajout du calcul des totaux dans le dashboard"
```
💡 **Astuce** : faire des commits petits, fréquents et logiques → plus facile à relire.  
Utilise la syntaxe standard pour les messages de commit, par exemple : `feat: ...`, `fix: ...`, `docs: ...`.

---

## 3️⃣ Sauvegarder son travail (push)
```bash
git push origin feature/ma-fonctionnalite
```
💡 Si quelqu’un a poussé sur la même branche entre temps :  
```bash
git pull --rebase origin feature/ma-fonctionnalite
git push origin feature/ma-fonctionnalite
```

---

## 4️⃣ Passer d’une machine à l’autre
Sur **l’autre machine** :
```bash
git fetch origin
git checkout feature/ma-fonctionnalite
git pull origin feature/ma-fonctionnalite
```
💡 **Important** : ne jamais commencer à coder **avant** ces commandes.

---

## Rabattre la branche feature dans main
Une fois la feature terminée, tu peux intégrer ta branche dans `main` par merge ou squash :
```bash
git checkout main
git pull origin main
git merge feature/ma-fonctionnalite  # ou git merge --squash feature/ma-fonctionnalite
git push origin main
```
Puis, pour nettoyer les branches :
```bash
git branch -d feature/ma-fonctionnalite          # supprime la branche locale
git push origin --delete feature/ma-fonctionnalite  # supprime la branche distante
```
💡 Cela évite d’avoir trop de branches obsolètes.

---

## 5️⃣ Fusionner dans `main` (une fois validé)
Sur la machine où tu veux fusionner :
```bash
git fetch origin
git checkout main
git pull origin main
git merge feature/ma-fonctionnalite
git push origin main
```
💡 Tu peux aussi faire la fusion depuis GitHub via une **Pull Request**.

---

## 6️⃣ Cas de conflit entre deux machines
Si tu as bossé sur **les deux machines** sans avoir synchronisé :
1. Sur la première machine : `git push origin feature/...`
2. Sur la deuxième machine :  
```bash
git pull --rebase origin feature/...
# résoudre les conflits
git add .
git rebase --continue
git push origin feature/...
```

---

📌 **Résumé rapide**
```
# Avant de coder
fetch → checkout → pull

# Pendant
add -A → commit → push

# Sur l’autre machine
fetch → checkout → pull

# Pour fusionner
checkout main → pull main → merge → push
```

---

## Revenir travailler sur main
Pour revenir sur la branche `main` et supprimer ta branche feature si elle n’est plus utile :
```bash
git checkout main
git pull origin main
git branch -d feature/ma-fonctionnalite          # supprime la branche locale
git push origin --delete feature/ma-fonctionnalite  # supprime la branche distante (optionnel)
```
💡 Cela permet de garder ton dépôt propre et à jour.
