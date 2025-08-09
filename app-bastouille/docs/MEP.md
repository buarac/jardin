
# ✅ Checklist de mise en production – app-bastouille

## 🗂️ 1. Nettoyage du code
- [ ] Supprimer tous les `console.log` de debug.
- [ ] Supprimer tous les imports inutilisés.
- [ ] Vérifier la structure des composants (`page.tsx`, `navigation.js`, etc.)
- [ ] Supprimer les fichiers inutiles dans `public/`.

## ⚙️ 2. Préparation du build
- [ ] Vérifier le script `prebuild` fonctionne correctement.
- [ ] Vérifier que le script `build` fonctionne sans erreur :
```bash
npm run build
```
- [ ] Vérifier le bon fonctionnement des assets (icônes, manifest, etc.)

## 🧪 3. Tests manuels en local (build prod)
- [ ] Lancer le site localement en mode prod :
```bash
npm run start
```
- [ ] Tester navigation clavier (flèches, ENTER)
- [ ] Tester affichage des données, cumuls, etc.

## 🐙 4. Git – Commit final et création du tag
- [ ] Commit final :
```bash
git add .
git commit -m "release: préparation version 1.0.0"
```
- [ ] Création du tag :
```bash
git tag v1.0.0
git push origin main --tags
```

## 🧳 5. Déploiement sur le serveur NUC
- [ ] SSH vers le NUC :
```bash
ssh user@nuc-ip
```
- [ ] Cloner ou pull la dernière version :
```bash
cd ~/app-bastouille
git fetch --tags
git checkout v1.0.0
```
- [ ] Installer les dépendances :
```bash
npm ci
```
- [ ] Générer le build :
```bash
npm run build
```

## 🚀 6. Lancer avec PM2
- [ ] Démarrer ou redémarrer l'app avec PM2 :
```bash
pm2 start npm --name app-bastouille -- run start
# ou si déjà existant :
pm2 restart app-bastouille
```
- [ ] Sauvegarder l’état PM2 :
```bash
pm2 save
```

## 🧪 7. Tests finaux sur TV
- [ ] Tester la navigation clavier (gauche/droite/haut/bas).
- [ ] Tester le comportement de la touche ENTER.
- [ ] Tester l'affichage des cumuls et des données.
- [ ] Vérifier le bon chargement de l’interface.

---

📅 Checklist générée automatiquement le 2025-08-07.
