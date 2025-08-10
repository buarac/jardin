# 🏗️ Architecture technique - Baštouille

> **Vue d'ensemble technique** de l'architecture et de l'organisation du code

## 📋 Table des matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [🏛️ Architecture générale](#️-architecture-générale)
- [🗂️ Structure des dossiers](#️-structure-des-dossiers)
- [💾 Base de données](#-base-de-données)
- [🔌 API et routes](#-api-et-routes)
- [⚙️ Jobs automatisés](#️-jobs-automatisés)
- [🎨 Frontend et composants](#-frontend-et-composants)
- [🌐 Intégrations externes](#-intégrations-externes)
- [📱 PWA et responsive](#-pwa-et-responsive)
- [🚀 Déploiement et production](#-déploiement-et-production)

---

## 🎯 Vue d'ensemble

**Baštouille** suit une architecture moderne basée sur **Next.js 14** avec une approche **full-stack** intégrée. L'application utilise des **API Routes** pour le backend et des **pages statiques** pour le frontend, le tout orchestré par **Prisma ORM** pour la persistance des données.

### 🏗️ **Stack technique**
- **Frontend** : Next.js 14 + React 18 + TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Backend** : Next.js API Routes + Prisma ORM
- **Base de données** : PostgreSQL
- **Jobs** : Système automatisé avec PM2
- **PWA** : Service Worker + Manifest

---

## 🏛️ Architecture générale

### **📊 Diagramme d'architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Base de       │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   données       │
│                 │    │                 │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Composants    │    │   Jobs          │    │   Migrations    │
│   UI (React)    │    │   automatisés   │    │   Prisma        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **🔄 Flux de données**
1. **Interface utilisateur** → Composants React
2. **Composants** → API Routes (fetch)
3. **API Routes** → Prisma Client
4. **Prisma** → Base PostgreSQL
5. **Jobs** → Mise à jour automatique des données

---

## 🗂️ Structure des dossiers

### **📁 Organisation générale**
```
app-bastouille/
├── app/                    # Application Next.js (App Router)
│   ├── api/               # API Routes (backend)
│   ├── components/        # Composants React réutilisables
│   ├── [interface]/       # Pages par interface (mobile, desktop, tv)
│   └── globals.css        # Styles globaux
├── lib/                   # Bibliothèques et utilitaires
│   ├── jobs/             # Jobs automatisés
│   ├── db.ts             # Configuration Prisma
│   └── utils.ts          # Fonctions utilitaires
├── prisma/                # Schéma et migrations
├── public/                # Assets statiques
└── docs/                  # Documentation
```

### **🔍 Détail des dossiers clés**

#### **`app/` - Application Next.js**
- **`api/`** : Endpoints backend (REST API)
- **`components/`** : Composants UI réutilisables
- **`[interface]/`** : Pages adaptées par appareil
- **`globals.css`** : Variables CSS et thèmes

#### **`lib/` - Bibliothèques**
- **`jobs/`** : Système de jobs automatisés
- **`db.ts`** : Client Prisma et configuration
- **`utils.ts`** : Fonctions utilitaires

#### **`prisma/` - Base de données**
- **`schema.prisma`** : Modèle de données
- **`migrations/`** : Évolution du schéma
- **`seed/`** : Données d'initialisation

---

## 💾 Base de données

### **🗄️ Modèle de données**

#### **Table `culture`**
```sql
model culture {
  id            Int           @id @default(autoincrement())
  nom           String        @unique
  img           String
  categorie     categorie
  mode_recolte  moderecolte
  recoltes      recolte[]
  created_at    DateTime      @default(now())
  updated_at    DateTime      @updatedAt
}
```

#### **Table `recolte`**
```sql
model recolte {
  id              Int       @id @default(autoincrement())
  culture_id      Int
  culture         culture   @relation(fields: [culture_id], references: [id])
  date            DateTime  @default(now())
  poids           Float
  quantite        Int?
  quantite_fiable Boolean   @default(true)
  recipient_id    Int?
  recipient       recipient? @relation(fields: [recipient_id], references: [id])
  created_at      DateTime  @default(now())
}
```

#### **Table `meteo_jour`**
```sql
model meteo_jour {
  id                Int      @id @default(autoincrement())
  date              DateTime @unique
  temperature_min   Float
  temperature_max   Float
  humidite          Float
  vent              Float
  indice_uv         Float
  qte_pluie         Float
  sunshine          Float
  sunrise           DateTime
  sunset            DateTime
  source            String
  weather_code      Int
  created_at        DateTime @default(now())
}
```

### **🔗 Relations et contraintes**
- **Culture → Récoltes** : One-to-Many
- **Récipient → Récoltes** : One-to-Many
- **Contraintes** : Dates uniques pour météo, noms uniques pour cultures

---

## 🔌 API et routes

### **🌐 Structure des API Routes**

#### **`/api/cultures`**
```typescript
// GET /api/cultures - Liste des cultures
// POST /api/cultures - Créer une culture
// PUT /api/cultures/[id] - Modifier une culture
// DELETE /api/cultures/[id] - Supprimer une culture
```

#### **`/api/recoltes`**
```typescript
// GET /api/recoltes - Liste des récoltes
// POST /api/recoltes - Créer une récolte
// PUT /api/recoltes/[id] - Modifier une récolte
// DELETE /api/recoltes/[id] - Supprimer une récolte
```

#### **`/api/meteo`**
```typescript
// GET /api/meteo - Données météo actuelles
// GET /api/meteo/synthese - Synthèse météo
```

### **🔐 Sécurité et validation**
- **Validation** : Vérification des types TypeScript
- **Sanitisation** : Nettoyage des entrées utilisateur
- **Gestion d'erreurs** : Réponses HTTP standardisées

---

## ⚙️ Jobs automatisés

### **🤖 Système de jobs**

#### **Architecture des jobs**
```
lib/jobs/
├── logs/
│   └── job-logger.ts      # Logger standardisé
├── meteo/
│   ├── alimentation.ts    # Récupération météo
│   └── exportation.ts     # Export données météo
└── db/
    └── export.ts          # Export base de données
```

#### **Job `meteo/alimentation`**
- **Fréquence** : Quotidienne (CRON)
- **Fonction** : Récupère les données Open-Meteo
- **Stockage** : Table `meteo_jour`
- **Logging** : Via `JobLogger`

#### **Job `db/export`**
- **Fréquence** : Sur demande
- **Fonction** : Export des données en JSON
- **Format** : Archive datée dans `/exports/`
- **Contenu** : Cultures, récoltes, météo, logs

### **📝 Standardisation des jobs**
- **Interface** : `async function runJob()`
- **Logging** : Utilisation obligatoire de `JobLogger`
- **Statuts** : OK, KO, PARTIAL, IGNORED
- **Gestion d'erreurs** : Try/catch avec fallback

---

## 🎨 Frontend et composants

### **🧩 Architecture des composants**

#### **Hiérarchie des composants**
```
App Layout
├── Header
├── Navigation
├── Main Content
│   ├── CultureSelector
│   ├── RecipientSelector
│   ├── RecolteEditForm
│   └── WeatherDisplayCard
└── Footer
```

#### **Composants clés**
- **`CultureSelector`** : Sélection de culture avec images
- **`RecipientSelector`** : Choix du récipient de récolte
- **`RecolteEditForm`** : Formulaire d'édition des récoltes
- **`WeatherDisplayCard`** : Affichage des données météo

### **🎨 Système de thèmes**

#### **Variables CSS**
```css
:root {
  /* Thème Soleil du Sud */
  --theme-soleil-primary: #f59e0b;
  --theme-soleil-secondary: #f97316;
  --theme-soleil-accent: #fbbf24;
  
  /* Thème Lavande */
  --theme-lavande-primary: #8b5cf6;
  --theme-lavande-secondary: #7c3aed;
  --theme-lavande-accent: #a78bfa;
}
```

#### **Mode sombre/clair**
- **Attribut** : `data-mode="dark"` ou `data-mode="light"`
- **Application** : Via JavaScript sur `document.documentElement`
- **Persistance** : Stockage local du navigateur

---

## 🌐 Intégrations externes

### **🌤️ API Open-Meteo**

#### **Endpoint utilisé**
```
https://api.open-meteo.com/v1/forecast
?latitude=48.9956
&longitude=2.2175
&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,uv_index_max,sunrise,sunset,windspeed_10m_max,sunshine_duration,relative_humidity_2m_max,weathercode
&timezone=auto
```

#### **Données récupérées**
- **Températures** : Min/Max quotidiennes
- **Précipitations** : Quantité de pluie
- **Ensoleillement** : Durée en secondes
- **Vent** : Vitesse maximale
- **UV** : Indice ultraviolet
- **Météo** : Code météo (WMO)

### **📱 PWA et Service Worker**

#### **Manifest.json**
```json
{
  "name": "Baštouille",
  "short_name": "Baštouille",
  "description": "Gestion de jardin potager",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#10b981",
  "background_color": "#ffffff"
}
```

#### **Service Worker**
- **Cache** : Stratégie "Cache First" pour les assets
- **Offline** : Fallback vers la page d'accueil
- **Mise à jour** : Notification de nouvelle version

---

## 📱 PWA et responsive

### **📱 Responsive Design**

#### **Breakpoints Tailwind**
```css
/* Mobile First */
.sm: 640px   /* Tablettes */
.md: 768px   /* Petits écrans */
.lg: 1024px  /* Écrans moyens */
.xl: 1280px  /* Grands écrans */
.2xl: 1536px /* Très grands écrans */
```

#### **Interfaces adaptatives**
- **Mobile** (`/mobile`) : Interface tactile optimisée
- **Desktop** (`/desktop`) : Navigation latérale complète
- **TV** (`/tv`) : Mode kiosque pour écrans larges

### **🔧 PWA Features**
- **Installation** : Ajout à l'écran d'accueil
- **Offline** : Fonctionnement sans connexion
- **Notifications** : Alertes et rappels
- **Performance** : Chargement rapide et fluide

---

## 🚀 Déploiement et production

### **⚙️ Configuration PM2**

#### **Fichier `pm2.config.js`**
```javascript
module.exports = {
  apps: [{
    name: 'bastouille',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

#### **Scripts de déploiement**
```bash
# Build de production
npm run build

# Démarrage PM2
pm2 start pm2.config.js

# Monitoring
pm2 monit

# Logs
pm2 logs bastouille
```

### **🔄 Jobs CRON**
```bash
# Météo quotidienne (6h du matin)
0 6 * * * /usr/bin/node /path/to/bastouille/lib/jobs/meteo/alimentation.js

# Export hebdomadaire (dimanche 2h du matin)
0 2 * * 0 /usr/bin/node /path/to/bastouille/lib/jobs/db/export.js
```

---

## 🔍 Monitoring et logs

### **📊 Logs des jobs**
- **Table** : `log_jobs`
- **Champs** : Nom, statut, message, timestamp
- **Statuts** : OK, KO, PARTIAL, IGNORED, PENDING

### **📈 Métriques de performance**
- **Temps de réponse** : API et pages
- **Utilisation mémoire** : Processus PM2
- **Erreurs** : Logs et notifications
- **Base de données** : Requêtes et performance

---

## 🆘 Besoin d'aide ?

### **📖 Documentation**
- 👤 [Guide utilisateur](USER_GUIDE.md) - Utilisation
- 👨‍💻 [Guide développeur](DEVELOPER_GUIDE.md) - Contribution
- 🧩 [Composants](COMPONENTS.md) - Catalogue UI

### **🔧 Support technique**
- **Issues GitHub** : [Signaler un problème](../../issues)
- **API** : [Référence API](API_REFERENCE.md)
- **Jobs** : [JobStandard.md](JobStandard.md)

---

<div align="center">
  <p><strong>🏗️ Architecture claire et modulaire</strong></p>
  <p><em>Explorez les [composants](COMPONENTS.md) pour comprendre l'interface utilisateur</em></p>
</div>
