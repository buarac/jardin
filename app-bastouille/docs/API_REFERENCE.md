# 🔌 Référence API - Baštouille

> **Documentation complète** de tous les endpoints et modèles de données

## 📋 Table des matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [🔐 Authentification et sécurité](#-authentification-et-sécurité)
- [📊 Modèles de données](#-modèles-de-données)
- [🌱 API Cultures](#-api-cultures)
- [🧺 API Récoltes](#-api-récoltes)
- [🌤️ API Météo](#️-api-météo)
- [📦 API Récipients](#-api-récipients)
- [⚙️ API Jobs](#️-api-jobs)
- [📝 Codes de réponse](#-codes-de-réponse)
- [🔍 Exemples d'utilisation](#-exemples-dutilisation)
- [❌ Gestion des erreurs](#-gestion-des-erreurs)

---

## 🎯 Vue d'ensemble

L'**API Baštouille** est une **REST API** basée sur **Next.js API Routes** qui fournit un accès programmatique à toutes les fonctionnalités de l'application. L'API suit les standards REST et retourne des réponses JSON standardisées.

### 🌐 **Base URL**
```
Développement : http://localhost:3000/api
Production   : https://votre-domaine.com/api
```

### 📡 **Méthodes HTTP supportées**
- **GET** : Récupération de données
- **POST** : Création de nouvelles ressources
- **PUT** : Mise à jour complète de ressources
- **DELETE** : Suppression de ressources

### 📋 **Format des réponses**
```json
{
  "success": true,
  "data": { /* données de la réponse */ },
  "message": "Opération réussie",
  "timestamp": "2025-01-07T10:30:00Z"
}
```

---

## 🔐 Authentification et sécurité

### **🔑 Authentification**
> ⚠️ **Note** : L'API actuelle ne nécessite pas d'authentification pour un usage local. En production, il est recommandé d'ajouter une authentification JWT ou API Key.

### **🛡️ Sécurité**
- **Validation** : Vérification des types TypeScript
- **Sanitisation** : Nettoyage des entrées utilisateur
- **CORS** : Configuration pour les domaines autorisés
- **Rate limiting** : Limitation des requêtes (à implémenter)

---

## 📊 Modèles de données

### **🌱 Culture**
```typescript
interface Culture {
  id: number;                    // Identifiant unique
  nom: string;                   // Nom de la culture
  img: string;                   // Chemin de l'image
  categorie: 'Fruit' | 'Légume' | 'Aromatique' | 'Fleur';
  mode_recolte: 'Poids' | 'Poids + Unité';
  created_at: Date;              // Date de création
  updated_at: Date;              // Date de modification
}
```

### **🧺 Récolte**
```typescript
interface Recolte {
  id: number;                    // Identifiant unique
  culture_id: number;            // ID de la culture
  culture: Culture;              // Relation avec la culture
  date: Date;                    // Date de récolte
  poids: number;                 // Poids en grammes
  quantite?: number;             // Quantité (optionnel)
  quantite_fiable: boolean;      // Fiabilité de la quantité
  recipient_id?: number;         // ID du récipient (optionnel)
  recipient?: Recipient;         // Relation avec le récipient
  created_at: Date;              // Date de création
}
```

### **🌤️ Météo**
```typescript
interface MeteoJour {
  id: number;                    // Identifiant unique
  date: Date;                    // Date des données
  temperature_min: number;        // Température minimale (°C)
  temperature_max: number;        // Température maximale (°C)
  humidite: number;              // Humidité relative (%)
  vent: number;                  // Vitesse du vent (km/h)
  indice_uv: number;             // Indice UV
  qte_pluie: number;             // Quantité de pluie (mm)
  sunshine: number;              // Ensoleillement (heures)
  sunrise: Date;                 // Lever du soleil
  sunset: Date;                  // Coucher du soleil
  source: string;                // Source des données
  weather_code: number;          // Code météo WMO
  created_at: Date;              // Date de création
}
```

### **📦 Récipient**
```typescript
interface Recipient {
  id: number;                    // Identifiant unique
  nom: string;                   // Nom du récipient
  img: string;                   // Chemin de l'image
  poids: number;                 // Poids du récipient (g)
  created_at: Date;              // Date de création
}
```

---

## 🌱 API Cultures

### **📋 Liste des cultures**
```http
GET /api/cultures
```

#### **Réponse**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nom": "Tomate cerise",
      "img": "/images/cultures/tomate_cerise.png",
      "categorie": "Légume",
      "mode_recolte": "Poids + Unité",
      "created_at": "2025-01-07T10:30:00Z",
      "updated_at": "2025-01-07T10:30:00Z"
    }
  ],
  "message": "Cultures récupérées avec succès"
}
```

### **🔍 Culture par ID**
```http
GET /api/cultures/{id}
```

#### **Paramètres**
- `id` (number) : Identifiant de la culture

#### **Réponse**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nom": "Tomate cerise",
    "img": "/images/cultures/tomate_cerise.png",
    "categorie": "Légume",
    "mode_recolte": "Poids + Unité",
    "recoltes": [
      {
        "id": 1,
        "poids": 250,
        "date": "2025-01-07T10:30:00Z"
      }
    ],
    "created_at": "2025-01-07T10:30:00Z",
    "updated_at": "2025-01-07T10:30:00Z"
  }
}
```

### **➕ Créer une culture**
```http
POST /api/cultures
```

#### **Corps de la requête**
```json
{
  "nom": "Nouvelle culture",
  "img": "/images/cultures/nouvelle.png",
  "categorie": "Légume",
  "mode_recolte": "Poids"
}
```

#### **Réponse**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "nom": "Nouvelle culture",
    "img": "/images/cultures/nouvelle.png",
    "categorie": "Légume",
    "mode_recolte": "Poids",
    "created_at": "2025-01-07T10:30:00Z",
    "updated_at": "2025-01-07T10:30:00Z"
  },
  "message": "Culture créée avec succès"
}
```

### **✏️ Modifier une culture**
```http
PUT /api/cultures/{id}
```

#### **Paramètres**
- `id` (number) : Identifiant de la culture

#### **Corps de la requête**
```json
{
  "nom": "Culture modifiée",
  "categorie": "Fruit"
}
```

### **🗑️ Supprimer une culture**
```http
DELETE /api/cultures/{id}
```

#### **Paramètres**
- `id` (number) : Identifiant de la culture

#### **Réponse**
```json
{
  "success": true,
  "message": "Culture supprimée avec succès"
}
```

---

## 🧺 API Récoltes

### **📋 Liste des récoltes**
```http
GET /api/recoltes
```

#### **Paramètres de requête**
- `culture_id` (number, optionnel) : Filtrer par culture
- `date_debut` (string, optionnel) : Date de début (YYYY-MM-DD)
- `date_fin` (string, optionnel) : Date de fin (YYYY-MM-DD)
- `limit` (number, optionnel) : Limite de résultats (défaut: 100)

#### **Exemple**
```http
GET /api/recoltes?culture_id=1&date_debut=2025-01-01&limit=50
```

#### **Réponse**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "culture_id": 1,
      "culture": {
        "id": 1,
        "nom": "Tomate cerise",
        "img": "/images/cultures/tomate_cerise.png"
      },
      "date": "2025-01-07T10:30:00Z",
      "poids": 250,
      "quantite": 1,
      "quantite_fiable": true,
      "recipient_id": 1,
      "recipient": {
        "id": 1,
        "nom": "Panier en osier",
        "poids": 50
      },
      "created_at": "2025-01-07T10:30:00Z"
    }
  ],
  "message": "Récoltes récupérées avec succès"
}
```

### **🔍 Récolte par ID**
```http
GET /api/recoltes/{id}
```

### **➕ Créer une récolte**
```http
POST /api/recoltes
```

#### **Corps de la requête**
```json
{
  "culture_id": 1,
  "poids": 250,
  "quantite": 1,
  "quantite_fiable": true,
  "recipient_id": 1
}
```

### **✏️ Modifier une récolte**
```http
PUT /api/recoltes/{id}
```

### **🗑️ Supprimer une récolte**
```http
DELETE /api/recoltes/{id}
```

---

## 🌤️ API Météo

### **📊 Données météo actuelles**
```http
GET /api/meteo
```

#### **Réponse**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "date": "2025-01-07T00:00:00Z",
    "temperature_min": 8.5,
    "temperature_max": 15.2,
    "humidite": 75,
    "vent": 12.3,
    "indice_uv": 3,
    "qte_pluie": 2.1,
    "sunshine": 6.5,
    "sunrise": "2025-01-07T08:15:00Z",
    "sunset": "2025-01-07T17:45:00Z",
    "source": "Open-Meteo",
    "weather_code": 3,
    "created_at": "2025-01-07T06:00:00Z"
  }
}
```

### **📈 Synthèse météo**
```http
GET /api/meteo/synthese
```

#### **Paramètres de requête**
- `jours` (number, optionnel) : Nombre de jours (défaut: 7)

#### **Réponse**
```json
{
  "success": true,
  "data": {
    "periode": "7 derniers jours",
    "moyennes": {
      "temperature_min": 7.2,
      "temperature_max": 14.8,
      "humidite": 78,
      "vent": 10.5,
      "qte_pluie": 15.3,
      "sunshine": 5.8
    },
    "donnees": [
      /* ... données quotidiennes ... */
    ]
  }
}
```

---

## 📦 API Récipients

### **📋 Liste des récipients**
```http
GET /api/recipients
```

#### **Réponse**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nom": "Panier en osier",
      "img": "/images/recipients/rec_bois.png",
      "poids": 50,
      "created_at": "2025-01-07T10:30:00Z"
    }
  ]
}
```

### **🔍 Récipient par ID**
```http
GET /api/recipients/{id}
```

---

## ⚙️ API Jobs

### **📊 Logs des jobs**
```http
GET /api/jobs/logs
```

#### **Paramètres de requête**
- `statut` (string, optionnel) : Filtrer par statut (OK, KO, PARTIAL, IGNORED)
- `limit` (number, optionnel) : Limite de résultats (défaut: 100)

#### **Réponse**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nom": "meteo_alimentation",
      "statut": "OK",
      "message": "Données météo enregistrées avec succès",
      "started_at": "2025-01-07T06:00:00Z",
      "ended_at": "2025-01-07T06:01:00Z",
      "created_at": "2025-01-07T06:01:00Z"
    }
  ]
}
```

### **📤 Export de la base de données**
```http
POST /api/jobs/db/export
```

#### **Réponse**
```json
{
  "success": true,
  "data": {
    "fichier": "exports/07_08_2025/culture.json",
    "taille": "2.5 MB",
    "date_creation": "2025-01-07T10:30:00Z"
  },
  "message": "Export créé avec succès"
}
```

### **🌤️ Export des données météo**
```http
POST /api/jobs/meteo/exportation
```

---

## 📝 Codes de réponse

### **✅ Codes de succès**
- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **204 No Content** : Suppression réussie

### **❌ Codes d'erreur**
- **400 Bad Request** : Données invalides
- **404 Not Found** : Ressource non trouvée
- **409 Conflict** : Conflit (ex: culture déjà existante)
- **500 Internal Server Error** : Erreur serveur

### **📋 Format des erreurs**
```json
{
  "success": false,
  "error": {
    "code": "CULTURE_NOT_FOUND",
    "message": "Culture non trouvée",
    "details": "Aucune culture avec l'ID 999"
  },
  "timestamp": "2025-01-07T10:30:00Z"
}
```

---

## 🔍 Exemples d'utilisation

### **🌱 Créer une culture et une récolte**

#### **1. Créer la culture**
```bash
curl -X POST http://localhost:3000/api/cultures \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Carotte",
    "img": "/images/cultures/carotte.png",
    "categorie": "Légume",
    "mode_recolte": "Poids"
  }'
```

#### **2. Créer la récolte**
```bash
curl -X POST http://localhost:3000/api/recoltes \
  -H "Content-Type: application/json" \
  -d '{
    "culture_id": 1,
    "poids": 300,
    "quantite_fiable": true
  }'
```

### **📊 Récupérer les statistiques**
```bash
# Récoltes de la semaine
curl "http://localhost:3000/api/recoltes?date_debut=2025-01-01&limit=100"

# Données météo actuelles
curl "http://localhost:3000/api/meteo"

# Synthèse météo sur 30 jours
curl "http://localhost:3000/api/meteo/synthese?jours=30"
```

### **🔧 JavaScript/TypeScript**
```typescript
// Récupérer les cultures
const cultures = await fetch('/api/cultures')
  .then(res => res.json())
  .then(data => data.data);

// Créer une récolte
const nouvelleRecolte = await fetch('/api/recoltes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    culture_id: 1,
    poids: 250,
    quantite_fiable: true
  })
}).then(res => res.json());
```

---

## ❌ Gestion des erreurs

### **🔍 Erreurs courantes**

#### **Culture non trouvée**
```json
{
  "success": false,
  "error": {
    "code": "CULTURE_NOT_FOUND",
    "message": "Culture non trouvée",
    "details": "Aucune culture avec l'ID spécifié"
  }
}
```

#### **Données invalides**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Données invalides",
    "details": "Le champ 'poids' doit être un nombre positif"
  }
}
```

#### **Conflit de données**
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_ENTRY",
    "message": "Entrée en double",
    "details": "Une culture avec ce nom existe déjà"
  }
}
```

### **🛠️ Gestion côté client**
```typescript
async function handleApiCall() {
  try {
    const response = await fetch('/api/cultures');
    const result = await response.json();
    
    if (result.success) {
      // Traitement des données
      console.log(result.data);
    } else {
      // Gestion de l'erreur
      console.error('Erreur API:', result.error);
    }
  } catch (error) {
    // Erreur réseau ou autre
    console.error('Erreur:', error);
  }
}
```

---

## 🆘 Besoin d'aide ?

### **📖 Documentation**
- 🏗️ [Architecture](ARCHITECTURE.md) - Structure technique
- 🧩 [Composants](COMPONENTS.md) - Interface utilisateur
- 👨‍💻 [Guide développeur](DEVELOPER_GUIDE.md) - Contribution

### **🔧 Support technique**
- **Issues GitHub** : [Signaler un problème](../../issues)
- **Tests API** : Utiliser les exemples ci-dessus
- **Validation** : Vérifier les types TypeScript

---

<div align="center">
  <p><strong>🔌 API complète et documentée</strong></p>
  <p><em>Explorez le [guide développeur](DEVELOPER_GUIDE.md) pour contribuer au projet</em></p>
</div>
