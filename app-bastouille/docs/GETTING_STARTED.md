# 🚀 Guide de démarrage - Baštouille

> **Démarrage rapide** pour installer et configurer Baštouille sur votre machine

## 📋 Table des matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [⚙️ Prérequis](#️-prérequis)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🚀 Première utilisation](#-première-utilisation)
- [🧪 Tests et vérification](#-tests-et-vérification)
- [❌ Résolution de problèmes](#-résolution-de-problèmes)
- [📚 Prochaines étapes](#-prochaines-étapes)

---

## 🎯 Vue d'ensemble

**Baštouille** est une application web moderne pour la gestion de jardin potager. Ce guide vous accompagne dans l'installation et la configuration de votre environnement de développement.

### 🎯 **Ce que vous allez accomplir**
1. ✅ Installer les dépendances système
2. ✅ Cloner et configurer le projet
3. ✅ Configurer la base de données
4. ✅ Lancer l'application en mode développement
5. ✅ Effectuer vos premières actions

---

## ⚙️ Prérequis

### **Système d'exploitation**
- ✅ **macOS** 10.15+ (Catalina)
- ✅ **Linux** Ubuntu 20.04+ / Debian 11+
- ✅ **Windows** 10+ (avec WSL2 recommandé)

### **Logiciels requis**
- **Node.js** : Version 18.0.0 ou supérieure
- **npm** : Version 8.0.0 ou supérieure (inclus avec Node.js)
- **Git** : Version 2.30.0 ou supérieure
- **PostgreSQL** : Version 13.0 ou supérieure

### **Vérification des prérequis**
```bash
# Vérifier Node.js
node --version
# Doit afficher v18.x.x ou supérieur

# Vérifier npm
npm --version
# Doit afficher 8.x.x ou supérieur

# Vérifier Git
git --version
# Doit afficher 2.30.x ou supérieur

# Vérifier PostgreSQL
psql --version
# Doit afficher 13.x ou supérieur
```

---

## 🔧 Installation

### **1. Cloner le projet**
```bash
# Cloner le dépôt
git clone https://github.com/votre-username/app-bastouille.git
cd app-bastouille

# Vérifier la structure
ls -la
# Doit afficher : app/, docs/, lib/, prisma/, package.json, etc.
```

### **2. Installer les dépendances**
```bash
# Installer les packages npm
npm install

# Vérifier l'installation
npm list --depth=0
# Doit afficher toutes les dépendances installées
```

### **3. Vérifier l'installation**
```bash
# Vérifier que Next.js est installé
npx next --version

# Vérifier que Prisma est installé
npx prisma --version

# Vérifier que TypeScript est installé
npx tsc --version
```

---

## ⚙️ Configuration

### **1. Configuration de l'environnement**

#### **Créer le fichier .env**
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env
nano .env  # ou code .env, vim .env
```

#### **Contenu du fichier .env**
```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/bastouille"

# Environnement
NODE_ENV="development"

# API Keys (optionnel pour le développement)
OPEN_METEO_API_KEY=""

# Configuration serveur
PORT=3000
HOSTNAME="localhost"
```

### **2. Configuration de la base de données**

#### **Créer la base PostgreSQL**
```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE bastouille;

# Créer un utilisateur (optionnel)
CREATE USER bastouille_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE bastouille TO bastouille_user;

# Quitter PostgreSQL
\q
```

#### **Appliquer le schéma Prisma**
```bash
# Générer le client Prisma
npm run generate:client

# Appliquer les migrations
npm run migrate:dev

# Vérifier la base
npx prisma studio
# Ouvre une interface web pour explorer la base
```

### **3. Configuration des thèmes et assets**

#### **Vérifier les assets**
```bash
# Vérifier que les images sont présentes
ls -la public/images/cultures/
ls -la public/images/recipients/

# Vérifier les icônes PWA
ls -la public/
# Doit contenir : icon-192.png, icon-512.png, manifest.json
```

---

## 🚀 Première utilisation

### **1. Lancer l'application**
```bash
# Mode développement
npm run dev

# L'application démarre sur http://localhost:3000
```

### **2. Accéder aux interfaces**

#### **Interface mobile** (`/mobile`)
- **URL** : http://localhost:3000/mobile
- **Usage** : Interface tactile pour enregistrer les récoltes
- **Fonctionnalités** : Sélecteurs de culture, formulaire de récolte

#### **Interface desktop** (`/desktop`)
- **URL** : http://localhost:3000/desktop
- **Usage** : Interface complète avec navigation
- **Fonctionnalités** : Tableau de bord, gestion, statistiques

#### **Interface TV** (`/tv`)
- **URL** : http://localhost:3000/tv
- **Usage** : Interface adaptée aux écrans larges
- **Fonctionnalités** : Affichage en mode kiosque

### **3. Premières actions**

#### **Ajouter une culture**
1. Aller sur `/desktop/cultures/new`
2. Remplir le formulaire avec :
   - **Nom** : "Tomate"
   - **Catégorie** : Légume
   - **Mode récolte** : Poids
3. Cliquer sur "Créer"

#### **Enregistrer une récolte**
1. Aller sur `/mobile`
2. Sélectionner "Tomate" dans le sélecteur de culture
3. Saisir un poids (ex: 500g)
4. Cliquer sur "Ajouter la récolte"

---

## 🧪 Tests et vérification

### **1. Vérifier les composants**
```bash
# Vérifier que tous les composants se chargent
npm run typecheck

# Vérifier le linting
npm run lint

# Vérifier la build
npm run build
```

### **2. Tester les API**
```bash
# Tester l'API des cultures
curl http://localhost:3000/api/cultures

# Tester l'API des récoltes
curl http://localhost:3000/api/recoltes

# Tester l'API météo
curl http://localhost:3000/api/meteo
```

### **3. Vérifier la base de données**
```bash
# Ouvrir Prisma Studio
npx prisma studio

# Vérifier les tables créées
# - culture
# - recolte
# - meteo_jour
# - log_jobs
# - recipient
```

---

## ❌ Résolution de problèmes

### **Problèmes courants**

#### **Erreur de connexion à la base**
```bash
# Vérifier que PostgreSQL tourne
sudo systemctl status postgresql

# Vérifier la connexion
psql -U postgres -d bastouille

# Vérifier l'URL dans .env
echo $DATABASE_URL
```

#### **Erreur de dépendances**
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Vérifier les versions
npm list --depth=0
```

#### **Erreur Prisma**
```bash
# Régénérer le client
npm run generate:client

# Réinitialiser la base
npm run reset:db

# Appliquer les migrations
npm run migrate:dev
```

#### **Port déjà utilisé**
```bash
# Vérifier les processus sur le port 3000
lsof -i :3000

# Tuer le processus
kill -9 <PID>

# Ou changer le port dans .env
PORT=3001
```

---

## 📚 Prochaines étapes

### **🎯 Développement**
- 📖 [Guide développeur](DEVELOPER_GUIDE.md) - Standards et bonnes pratiques
- 🏗️ [Architecture](ARCHITECTURE.md) - Comprendre la structure technique
- 🧩 [Composants](COMPONENTS.md) - Explorer les composants UI

### **👤 Utilisation**
- 👤 [Guide utilisateur](USER_GUIDE.md) - Maîtriser toutes les fonctionnalités
- 🎨 [Thèmes UI](UI_THEMES.md) - Personnaliser l'interface
- 📊 [Statistiques](USER_GUIDE.md#statistiques) - Analyser vos données

### **🚀 Production**
- 🚀 [Déploiement](DEPLOYMENT.md) - Mettre en production
- ⚙️ [Configuration PM2](DEPLOYMENT.md#configuration-pm2) - Gérer les processus
- 📈 [Monitoring](DEPLOYMENT.md#monitoring) - Surveiller l'application

---

## 🆘 Besoin d'aide ?

### **📖 Documentation**
- 🔍 [Navigation rapide](../README.md#-navigation-rapide)
- 📚 [Table des matières](../README.md#-table-des-matieres)
- 🆘 [Support](../README.md#-besoin-daide-)

### **🐛 Problèmes techniques**
- **Issues GitHub** : [Créer une issue](../../issues)
- **Documentation** : [Guide développeur](DEVELOPER_GUIDE.md)
- **Standards** : [JobStandard.md](JobStandard.md)

---

<div align="center">
  <p><strong>🎉 Félicitations !</strong> Baštouille est maintenant installé et configuré.</p>
  <p><em>Passez au [Guide utilisateur](USER_GUIDE.md) pour découvrir toutes les fonctionnalités</em></p>
</div>
