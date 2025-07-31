# Baštouille – Application de gestion de cultures et récoltes

Baštouille est une application web pensée pour le potager. Elle vous permet de
gérer vos cultures (légumes, fruits, aromatiques, fleurs), de consigner chaque
récolte en incluant les données météo du moment et de visualiser des
statistiques annuelles. L'interface s'inspire des applications iOS : barre
supérieure avec titre et éventuel bouton de retour, contenu central
défilable et barre de navigation inférieure. Les couleurs principales sont un
vert kaki et une teinte dorée.

## Fonctionnalités principales

### Gestion des cultures

- **Liste des cultures** : affiche toutes les cultures enregistrées avec leur
  illustration, leur catégorie et leur mode de récolte (poids seul ou poids +
  nombre d’unités).
- **Création d’une culture** : saisie du nom, de la catégorie, du mode de
  récolte et du nom du fichier image. Les images doivent être placées dans
  `public/cultures`. Un fichier `placeholder.png` est fourni par défaut.
- **Modification d’une culture** : possibilité de renommer une culture et
  d’ajuster sa catégorie ou son mode de récolte. Lorsque vous modifiez au
  moins un champ, un bouton « Mettre à jour » apparaît.
- **Ajout d’une récolte depuis la fiche culture** : un bouton permet de
  accéder directement au formulaire de saisie pré‑rempli avec la culture
  courante.

### Gestion des récoltes

- **Saisie d’une récolte** : sélection de la culture, saisie du poids en
  grammes et éventuellement du nombre d’unités (si le mode de récolte est
  `poids_unite`).
- **Date et heure** : initialisées à l’instant présent mais modifiables grâce
  au champ `datetime-local`.
- **Météo en temps réel** : la page récupère automatiquement la température,
  l’humidité, la pression, la vitesse du vent et l’indice UV pour
  Cormeilles‑en‑Parisis via l’API libre d’Open‑Meteo. Vous pouvez changer
  d’API en ajustant le fichier `src/lib/weather.ts` et la variable
  d’environnement `WEATHER_API_KEY`.
- **Enregistrement** : en validant le formulaire, la récolte est stockée dans
  la base de données avec les données météo. Les pages d’accueil et de
  statistiques sont automatiquement réactualisées.

### Accueil

- Affiche les quatre dernières récoltes. La plus récente occupe un tiers de
  l’écran avec tous les détails (image de la culture, date, poids, quantité,
  météo). Les trois suivantes apparaissent sous forme de liste condensée.

### Statistiques

- Liste déroulante des années pour lesquelles des récoltes existent.
- Tableau présentant, pour l’année sélectionnée, le cumul des poids (en
  kilogrammes) et, le cas échéant, le nombre d’unités récoltées pour chaque
  culture.

## Structure technique

- **Framework** : [Next.js](https://nextjs.org) en mode App Router, avec
  rendu côté serveur pour les listes et composants côté client pour les
  formulaires interactifs.
- **UI** : Tailwind CSS et la bibliothèque [shadcn/ui](https://ui.shadcn.com).
  Les composants tels que le header, la barre de navigation et les cartes
  utilisent les classes utilitaires Tailwind ainsi que les couleurs
  personnalisées définies dans `tailwind.config.ts` (`kaki` et `gold`).
- **Base de données** : PostgreSQL accédée via [Prisma](https://prisma.io).
  Deux modèles sont définis dans `prisma/schema.prisma` :
  `Culture` et `Recolte`. Les énumérations `Categorie` et `ModeRecolte`
  garantissent l’intégrité des valeurs stockées.
- **Actions serveur** : les opérations de création et de mise à jour sont
  implémentées dans `src/app/actions/*.ts` et sont appelées depuis les
  composants clients à l’aide des transitions React. Les chemins concernés
  sont revalidés après chaque mutation pour mettre à jour le cache.
- **API interne** : un endpoint `/api/stats?year=YYYY` calcule les agrégats
  nécessaires à l’affichage des statistiques.

## Pré‑requis

Vous devez disposer des éléments suivants :

- Node .js ≥ 18 (Next .js requiert un environnement récent).
- Un serveur PostgreSQL accessible localement ou à distance. Sous Linux,
  l’installation peut se faire via `apt install postgresql` et la création
  d’une base nommée `bastouille` via `createdb bastouille`. Sous Windows ou
  macOS, utilisez l’installateur officiel ou Docker.

## Installation et lancement

1. **Récupérez le code** : clonez ce dépôt ou copiez le dossier `app-bastouille` dans
   votre environnement de travail.
2. **Installez les dépendances** : exécutez `npm install` à la racine du
   projet (`app-bastouille`).
3. **Configurez la base de données** :
   - Copiez le fichier `.env` et ajustez `DATABASE_URL` avec vos identifiants
     PostgreSQL (ex : `postgresql://utilisateur:motdepasse@localhost:5432/bastouille?schema=public`).
   - Créez la base si nécessaire (`createdb bastouille`).
   - Initialisez le schéma avec Prisma : `npx prisma db push`. Cette
     commande lit `prisma/schema.prisma` et crée les tables correspondantes.
4. **Générez le client Prisma** (si vous modifiez le schéma) : `npx prisma generate`.
5. **Démarrez le serveur de développement** : `npm run dev`. L’application
   est accessible sur `http://localhost:3000`.

## Gestion des images

Les cultures sont illustrées par des fichiers PNG stockés dans le dossier
`public/cultures`. Lorsque vous créez une nouvelle culture, indiquez le
nom du fichier dans le champ « Nom du fichier image ». Vous pouvez ajouter
vos propres images dans ce dossier, par exemple `tomate.png`,
`carotte.png`, etc. Un fichier `placeholder.png` est fourni pour les
cultures sans illustration.

## Personnalisation de l’identité visuelle

Les couleurs principales de l’application sont définies dans
`tailwind.config.ts` :

```ts
colors: {
  kaki: {
    DEFAULT: "#78866B",
    light: "#9fae83",
    dark: "#545d49",
  },
  gold: {
    DEFAULT: "#D4AF37",
    light: "#e6c85d",
    dark: "#af8e2f",
  },
}
```

Vous pouvez modifier ces valeurs pour adapter l’interface à votre charte
graphique. Après modification, redémarrez le serveur (`npm run dev`) pour
appliquer les changements.

## Déploiement

Pour un déploiement en production, générez le build avec `npm run build` puis
exécutez `npm start`. Assurez‑vous que la variable `DATABASE_URL` pointe
vers une base PostgreSQL accessible par votre serveur d’hébergement.

## Contributions et gestion du code

Le projet est structuré pour être utilisé avec Visual Studio Code et Git.
Le linter ESLint et le formateur Prettier sont configurés pour respecter
des règles de style cohérentes. Avant de pousser des changements, il est
recommandé de lancer `npm run lint` et d’effectuer les ajustements
signalés. Les actions serveur se trouvent dans `src/app/actions`, les
composants réutilisables dans `src/components` et les appels API dans
`src/app/api`.

---

Baštouille est un outil évolutif. N’hésitez pas à personnaliser les
fonctionnalités, à ajouter de nouveaux champs à vos récoltes (pH du sol,
ensoleillement, notes personnelles, etc.) et à améliorer la présentation.
Bonne culture !