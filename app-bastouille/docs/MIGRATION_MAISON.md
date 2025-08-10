# Migration vers buarac/maison

## Vue d'ensemble
Ce document détaille la migration du projet `app-bastouille` vers le nouveau dépôt `buarac/maison` avec renommage du projet en `bastouille`.

## Statut de la Migration

### ✅ Phase 1 : Préparation (Mac Principal) - TERMINÉE
- [x] **1.1 - Créer le dépôt `buarac/maison` sur GitHub**
- [x] **1.2 - Préparer la migration locale**
  - Branche de migration créée : `migration-vers-maison`
  - Tous les changements commités

### ✅ Phase 2 : Migration sur Mac Principal (MacBook) - TERMINÉE
- [x] **2.1 - Ajouter le nouveau remote**
  ```bash
  git remote add maison https://github.com/buarac/maison.git
  ```
- [x] **2.2 - Pousser le code vers le nouveau dépôt**
  - Branche `main` poussée
  - Toutes les branches poussées
  - Tous les tags poussés
- [x] **2.3 - Renommer le projet local**
  - Dossier renommé de `app-bastouille` vers `bastouille`
  - Changements commités et poussés

### ✅ Phase 3 : Migration sur Mac Mini - TERMINÉE
- [x] **3.1 - Cloner le nouveau dépôt**
  ```bash
  cd ~/github
  git clone https://github.com/buarac/maison.git
  ```
- [x] **3.2 - Installer les dépendances**
  ```bash
  cd maison/app-bastouille
  npm install
  ```
- [x] **3.3 - Configurer l'environnement**
  - Projet accessible dans `~/github/maison/app-bastouille`
  - Compilation réussie (`npm run build`)

### 🔄 Phase 4 : Migration sur NUC Ubuntu - EN ATTENTE
- [ ] **4.1 - Se connecter au NUC**
- [ ] **4.2 - Sauvegarder l'ancienne version**
- [ ] **4.3 - Cloner le nouveau dépôt**
- [ ] **4.4 - Installer et configurer**
- [ ] **4.5 - Mettre à jour PM2**

### 🔄 Phase 5 : Finalisation - EN ATTENTE
- [ ] **5.1 - Tester sur tous les environnements**
- [ ] **5.2 - Nettoyer l'ancien dépôt**
- [ ] **5.3 - Mettre à jour la documentation**

## Détails Techniques

### Remotes Git
- **Origin (ancien) :** `https://github.com/buarac/jardin.git`
- **Maison (nouveau) :** `https://github.com/buarac/maison.git`

### Branches Migrées
- `main` ✅
- `feature/mobile-corrections` ✅
- `feature/mobile-form-validation` ✅
- `migration-vers-maison` ✅

### Tags Migrés
- `prod-mobile-v1` ✅
- `v1.1.0` ✅
- `v1.1.1` ✅
- `v1.1.2` ✅
- `v1.1.3` ✅
- `v1.2.0` ✅

## Instructions pour les Autres Environnements

### Mac Mini
```bash
cd ~/github
git clone https://github.com/buarac/maison.git
cd bastouille
npm install
# Configurer .env si nécessaire
```

### NUC Ubuntu
```bash
# Sauvegarder l'ancienne version
cd /chemin/vers/app-bastouille
cp -r . ../app-bastouille-backup-$(date +%Y%m%d)

# Cloner le nouveau dépôt
cd /chemin/vers
git clone https://github.com/buarac/maison.git
cd bastouille

# Installer et configurer
npm install
npm run build

# Mettre à jour PM2
pm2 stop app-bastouille
pm2 delete app-bastouille
pm2 start pm2.config.js --name bastouille
pm2 save
```

## Vérifications Post-Migration

### ✅ Vérifications Effectuées sur MacBook
- [x] Compilation réussie (`npm run build`)
- [x] Tous les fichiers présents
- [x] Structure Git intacte
- [x] Remotes configurés

### ✅ Vérifications Effectuées sur Mac Mini
- [x] Application accessible
- [x] Base de données connectée
- [x] Fonctionnalités principales opérationnelles
- [x] Compilation réussie (`npm run build`)
- [x] Dépendances installées
- [x] Projet cloné depuis `buarac/maison`

### 🔄 Vérifications à Effectuer sur NUC
- [ ] Application accessible
- [ ] PM2 fonctionne correctement
- [ ] Base de données connectée
- [ ] Fonctionnalités principales opérationnelles

## Prochaines Étapes

1. ✅ **Migrer le Mac Mini** (Phase 3) - **TERMINÉ**
2. **Migrer le NUC** (Phase 4)
3. **Tester sur tous les environnements** (Phase 5)
4. **Nettoyer l'ancien dépôt** (Phase 5)

## Support

En cas de problème lors de la migration, consulter :
- Les logs de compilation
- Les logs PM2 sur le NUC
- La configuration des variables d'environnement
- La connectivité à la base de données
