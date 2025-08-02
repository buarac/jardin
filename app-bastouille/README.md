# Baštouille

Baštouille est une application web de suivi de cultures et de récoltes pour votre jardin. Elle est conçue pour fonctionner sur mobile comme sur ordinateur avec une interface responsive et une prise en charge des PWA afin de l'installer sur l'écran d'accueil d'un iPhone.

## Fonctionnalités principales

- **Gestion des cultures** : création, édition, suppression et liste des cultures avec recherche par nom.
- **Gestion des récoltes** : ajout, édition, suppression et filtrage des récoltes par année, mois ou catégorie.
- **Statistiques** : visualisation des cumuls de récoltes par année et par culture avec poids total et nombre d'unités.
- **Thèmes** : deux identités visuelles sont proposées (Soleil du Sud et Lavande et Romarin) avec un mode clair et sombre. Le choix est mémorisé dans le navigateur.
- **Navigation adaptative** : sur mobile la barre de navigation inférieure est réduite et certaines fonctionnalités (liste complète des récoltes ou des cultures) sont masquées pour privilégier l'ajout rapide ; sur ordinateur toutes les fonctionnalités sont disponibles.

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [npm](https://www.npmjs.com/) v9 ou supérieur
- [PostgreSQL](https://www.postgresql.org/) : une base de données nommée `bastouille` doit être accessible. Le schéma de base est défini dans le fichier `prisma/schema.prisma`.

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone <url-du-depot> app-bastouille
   cd app-bastouille
   ```

2. **Configurer l'environnement**

   Copiez le fichier d'exemple `.env.example` vers `.env` et adaptez la chaîne de connexion à votre serveur PostgreSQL :

   ```bash
   cp .env.example .env
   # Éditer .env pour ajuster DATABASE_URL
   ```

3. **Installer les dépendances**

   ```bash
   npm install
   ```

4. **Initialiser la base de données**

   Le modèle de données est défini via [Prisma](https://www.prisma.io/). Exécutez les migrations pour créer les tables :

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Démarrer l'application en développement**

   ```bash
   npm run dev
   ```

   L'application est accessible sur `http://localhost:3000`.

## Structure du projet

- `app/` : répertoire racine des pages Next.js utilisant le système `app router`. Chaque sous‐dossier représente une route et peut contenir des composants clients pour l’interactivité.
- `app/components/` : composants réutilisables tels que la barre de navigation (`FooterNav`), l’entête (`Header`), les formulaires, etc.
- `prisma/` : contient le schéma Prisma décrivant les tables `Culture` et `Recolte`. Le générateur Prisma crée automatiquement le client dans `node_modules/.prisma/client`.
- `public/` : ressources statiques servies telles que l’icône PWA et un placeholder d’image. Vous pouvez ajouter vos propres images de cultures dans `public/images/cultures/` et renseigner leur nom dans le champ `img` d’une culture.
- `app/globals.css` : styles globaux et définitions des variables CSS utilisées par les thèmes. Les variables sont appliquées en fonction des attributs `data-theme` et `data-mode` sur l’élément `<html>`.
- `app/components/ThemeProvider.tsx` : contexte React chargé de mémoriser et d’appliquer le thème et le mode couleur.
- `app/api/` : routes d’API (CRUD) pour les cultures et les récoltes. Elles utilisent Prisma pour interagir avec la base.

## Changement d’identité visuelle

Deux thèmes sont fournis : **Soleil du Sud** (teintes chaudes) et **Lavande et Romarin** (teintes mauves). Chaque thème possède une variante claire et sombre. Le choix du thème et du mode se fait dans l’onglet Paramétrage via un sélecteur.

Pour modifier les couleurs ou ajouter de nouveaux thèmes :

1. Ouvrez `app/globals.css` et localisez les blocs `html[data-theme='nom']`.
2. Modifiez les variables CSS `--color-base`, `--color-fill`, `--color-text`, `--color-accent`, `--color-muted` et `--color-card` selon votre palette.
3. Si vous ajoutez un nouveau thème, actualisez également le type `ThemeName` dans `app/components/ThemeProvider.tsx` et ajoutez des options correspondantes dans `ThemeSwitcher.tsx`.

## Gestion de la PWA

Le fichier `public/manifest.json` décrit les informations de l’application pour l’installation sur mobile (nom, icônes, couleurs). Deux icônes génériques sont fournies (`icon-192.png` et `icon-512.png`). Remplacez‐les par vos propres images si nécessaire. Pour activer le service worker, vous pouvez intégrer un outil comme `next-pwa` dans `next.config.js`.

## Déploiement

En production, exécutez :

```bash
npm run build
npm start
```

ou déployez l’application sur une plateforme compatible avec Next.js (Vercel, Railway, etc.). N’oubliez pas de fournir la variable d’environnement `DATABASE_URL`.

## Licence

Ce projet est fourni à titre d’exemple pour illustrer la création d’une application web complète avec Next.js, Prisma et Tailwind. Adaptez et améliorez le selon vos besoins !
<ChartLine color="#669c35" />
