# 👤 Guide utilisateur - Baštouille

> **Guide complet** pour utiliser toutes les fonctionnalités de Baštouille

## 📋 Table des matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [📱 Interfaces disponibles](#-interfaces-disponibles)
- [🌱 Gestion des cultures](#-gestion-des-cultures)
- [🧺 Gestion des récoltes](#-gestion-des-récoltes)
- [🌤️ Données météo](#️-données-météo)
- [📊 Statistiques et analyses](#-statistiques-et-analyses)
- [🎨 Personnalisation](#-personnalisation)
- [📱 PWA et installation](#-pwa-et-installation)
- [❓ Questions fréquentes](#-questions-fréquentes)

---

## 🎯 Vue d'ensemble

**Baštouille** est votre compagnon numérique pour la gestion de jardin potager. L'application s'adapte automatiquement à votre appareil et vous offre une expérience optimisée selon le contexte d'utilisation.

### 🌟 **Fonctionnalités principales**
- **Gestion des cultures** : Suivi des plantations et variétés
- **Enregistrement des récoltes** : Suivi des quantités et dates
- **Données météo** : Intégration automatique des conditions climatiques
- **Statistiques** : Analyse des performances de votre jardin
- **Thèmes personnalisables** : Interface adaptée à vos goûts

---

## 📱 Interfaces disponibles

### **📱 Interface Mobile** (`/mobile`)
**Optimisée pour** : Smartphones et tablettes tactiles

#### **Caractéristiques**
- Interface tactile intuitive
- Formulaire de récolte simplifié
- Sélecteurs de culture et récipient
- Thèmes et mode sombre/clair
- Navigation par zones collapsibles

#### **Cas d'usage**
- Enregistrement rapide des récoltes
- Consultation des synthèses
- Utilisation en extérieur (jardin)

---

### **💻 Interface Desktop** (`/desktop`)
**Optimisée pour** : Ordinateurs et écrans larges

#### **Caractéristiques**
- Navigation latérale complète
- Tableaux de données détaillés
- Gestion avancée des cultures
- Monitoring des jobs automatisés
- Statistiques et analyses

#### **Cas d'usage**
- Planification des cultures
- Analyse des performances
- Gestion administrative
- Configuration du système

---

### **📺 Interface TV** (`/tv`)
**Optimisée pour** : Écrans larges et affichage distant

#### **Caractéristiques**
- Interface en mode kiosque
- Affichage des informations essentielles
- Navigation par télécommande
- Mise à jour en temps réel

#### **Cas d'usage**
- Affichage dans la cuisine
- Monitoring du jardin
- Présentation des données

---

## 🌱 Gestion des cultures

### **📝 Créer une nouvelle culture**

#### **Via l'interface desktop**
1. Aller sur `/desktop/cultures/new`
2. Remplir le formulaire :
   - **Nom** : Nom de la culture (ex: "Tomate cerise")
   - **Catégorie** : Fruit, Légume, Aromatique, Fleur
   - **Mode de récolte** : Poids ou Poids + Unité
   - **Image** : Sélectionner une image représentative
3. Cliquer sur "Créer"

#### **Exemples de cultures**
```
🍅 Tomate cerise
   Catégorie : Légume
   Mode : Poids + Unité

🥕 Carotte
   Catégorie : Légume
   Mode : Poids

🌿 Basilic
   Catégorie : Aromatique
   Mode : Poids
```

### **✏️ Modifier une culture existante**
1. Aller sur `/desktop/cultures/[id]`
2. Cliquer sur "Modifier"
3. Ajuster les informations
4. Sauvegarder les modifications

### **🗑️ Supprimer une culture**
> ⚠️ **Attention** : La suppression d'une culture supprime aussi toutes ses récoltes associées.

1. Aller sur la page de la culture
2. Cliquer sur "Supprimer"
3. Confirmer la suppression

---

## 🧺 Gestion des récoltes

### **📱 Enregistrer une récolte (Mobile)**

#### **Étape 1 : Sélection de la culture**
- Ouvrir l'interface mobile (`/mobile`)
- Utiliser le sélecteur de culture
- Choisir la culture récoltée

#### **Étape 2 : Saisie des données**
- **Poids** : Saisir le poids en grammes
- **Quantité** : Si applicable (mode "Poids + Unité")
- **Récipient** : Sélectionner le récipient utilisé

#### **Étape 3 : Validation**
- Vérifier les informations
- Cliquer sur "Ajouter la récolte"
- Confirmer le succès

#### **Exemple concret**
```
🌱 Culture : Tomate cerise
⚖️ Poids : 250g
📦 Récipient : Panier en osier
📅 Date : Automatique (aujourd'hui)
```

### **💻 Gestion avancée (Desktop)**

#### **Consultation des récoltes**
- Aller sur `/desktop/recoltes`
- Filtrer par culture, date, période
- Exporter les données

#### **Modification d'une récolte**
1. Cliquer sur la récolte à modifier
2. Ajuster les informations
3. Sauvegarder

#### **Suppression d'une récolte**
1. Ouvrir la récolte
2. Cliquer sur "Supprimer"
3. Confirmer

---

## 🌤️ Données météo

### **📊 Informations disponibles**
L'application collecte automatiquement les données météo via l'API Open-Meteo :

- **Températures** : Min/Max quotidiennes
- **Précipitations** : Quantité de pluie
- **Ensoleillement** : Durée d'ensoleillement
- **Humidité** : Taux d'humidité relative
- **Vent** : Vitesse maximale
- **Indice UV** : Niveau d'ultraviolets
- **Lever/Coucher** : Heures de soleil

### **📍 Localisation**
- **Coordonnées** : 48.9956°N, 2.2175°E
- **Mise à jour** : Quotidienne (automatique)
- **Source** : Open-Meteo (gratuit et fiable)

### **📈 Consultation des données**
- **Interface mobile** : Affichage des conditions actuelles
- **Interface desktop** : Historique et graphiques
- **API** : `/api/meteo` pour accès programmatique

---

## 📊 Statistiques et analyses

### **📱 Synthèse mobile**
L'interface mobile affiche une synthèse des récoltes :

#### **Périodes disponibles**
- **Semaine** : 7 derniers jours
- **Mois** : 30 derniers jours  
- **Année** : 365 derniers jours

#### **Informations affichées**
- Nom de la culture
- Image représentative
- Poids cumulé (en kg)
- Tri par performance

### **💻 Analyses desktop**
L'interface desktop offre des analyses plus détaillées :

#### **Tableau de bord**
- Vue d'ensemble des performances
- Tendances par culture
- Comparaisons temporelles

#### **Statistiques avancées**
- Rendement par m²
- Évolution saisonnière
- Corrélation météo/récoltes

---

## 🎨 Personnalisation

### **🌞 Thèmes disponibles**

#### **Soleil du Sud**
- **Palette** : Tons chauds et ensoleillés
- **Couleurs** : Jaune, orange, beige
- **Ambiance** : Méditerranéenne, chaleureuse

#### **Lavande et Romarin**
- **Palette** : Tons frais et apaisants
- **Couleurs** : Violet, bleu, vert
- **Ambiance** : Provençale, zen

### **🌙 Mode sombre/clair**

#### **Mode clair**
- **Avantages** : Lisibilité en extérieur
- **Utilisation** : Jour, extérieur, forte luminosité

#### **Mode sombre**
- **Avantages** : Confort visuel, économie batterie
- **Utilisation** : Soir, intérieur, faible luminosité

### **⚙️ Configuration des thèmes**
1. Aller dans les paramètres
2. Sélectionner le thème souhaité
3. Choisir le mode (clair/sombre)
4. Les changements s'appliquent immédiatement

---

## 📱 PWA et installation

### **📱 Installation sur mobile**

#### **iOS (Safari)**
1. Ouvrir l'application dans Safari
2. Cliquer sur le bouton de partage (📤)
3. Sélectionner "Sur l'écran d'accueil"
4. Confirmer l'ajout

#### **Android (Chrome)**
1. Ouvrir l'application dans Chrome
2. Cliquer sur le menu (⋮)
3. Sélectionner "Ajouter à l'écran d'accueil"
4. Confirmer l'ajout

### **💻 Installation sur desktop**

#### **Chrome/Edge**
1. Cliquer sur l'icône d'installation (📥)
2. Confirmer l'installation
3. L'application apparaît dans le menu

#### **Firefox**
1. Cliquer sur l'icône d'installation
2. Suivre les instructions
3. L'application s'installe

### **✨ Avantages PWA**
- **Hors ligne** : Fonctionne sans connexion
- **Notifications** : Alertes et rappels
- **Performance** : Chargement rapide
- **Intégration** : Se comporte comme une app native

---

## ❓ Questions fréquentes

### **🔧 Problèmes techniques**

#### **L'application ne se charge pas**
- Vérifier la connexion internet
- Actualiser la page (F5)
- Vider le cache du navigateur
- Vérifier que le serveur fonctionne

#### **Les données ne s'enregistrent pas**
- Vérifier la connexion à la base
- Contrôler les permissions
- Vérifier la validité des données saisies

#### **Problème d'affichage sur mobile**
- Vérifier la version du navigateur
- Actualiser l'application
- Réinstaller la PWA si nécessaire

### **📊 Questions sur les données**

#### **Comment modifier une récolte ?**
- Via l'interface desktop : `/desktop/recoltes/[id]`
- Via l'API : `PUT /api/recoltes/[id]`

#### **Comment exporter mes données ?**
- Interface desktop : Section export
- API : `/api/jobs/db/export`

#### **Les données météo sont-elles fiables ?**
- Source : Open-Meteo (données officielles)
- Précision : Excellente pour la planification
- Mise à jour : Quotidienne automatique

### **🎨 Questions sur l'interface**

#### **Comment changer de thème ?**
- Interface mobile : Zone de configuration
- Interface desktop : Paramètres → Thèmes

#### **Comment personnaliser l'affichage ?**
- Utiliser les paramètres de l'interface
- Adapter la taille des éléments
- Choisir le mode d'affichage

---

## 🆘 Besoin d'aide ?

### **📖 Documentation**
- 🚀 [Guide de démarrage](GETTING_STARTED.md) - Installation
- 👨‍💻 [Guide développeur](DEVELOPER_GUIDE.md) - Technique
- 🏗️ [Architecture](ARCHITECTURE.md) - Structure

### **🐛 Support technique**
- **Issues GitHub** : [Signaler un problème](../../issues)
- **Documentation** : [Composants](COMPONENTS.md)
- **API** : [Référence API](API_REFERENCE.md)

---

<div align="center">
  <p><strong>🌱 Prêt à cultiver votre jardin numérique ?</strong></p>
  <p><em>Explorez [l'architecture](ARCHITECTURE.md) pour comprendre le fonctionnement technique</em></p>
</div>
