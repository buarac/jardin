# Composants de l'Application

## Composants Principaux

### CultureSelector
Sélecteur de culture avec images et noms.

### RecipientSelector  
Sélecteur de récipient avec gestion des poids.

### Collapsible
Section pliable/dépliable avec animation.

## Composants Mobile

### MobileThemeToggle
Gestion des thèmes (soleil/lavande) et du mode clair/sombre.

**Props:**
- `themeState`: État actuel du thème
- `onThemeChange`: Callback pour changer le thème
- `onDarkModeChange`: Callback pour changer le mode

### MobileCollapsibleSection
Section pliable avec titre et contenu animé.

**Props:**
- `title`: Titre de la section
- `icon`: Icône optionnelle
- `children`: Contenu de la section
- `defaultOpen`: État d'ouverture par défaut
- `className`: Classes CSS additionnelles

### MobilePeriodSelector
Sélecteur de période (semaine/mois/année).

**Props:**
- `selectedPeriod`: Période sélectionnée
- `onPeriodChange`: Callback pour changer la période
- `periods`: Liste des périodes disponibles
- `className`: Classes CSS additionnelles

### MobileRecolteTable
Tableau d'affichage des récoltes avec gestion des états.

**Props:**
- `recoltes`: Liste des récoltes à afficher
- `loading`: État de chargement
- `error`: Message d'erreur éventuel
- `className`: Classes CSS additionnelles

### MobileRecolteForm
Formulaire d'ajout de récolte avec validation en temps réel.

**Props:**
- `cultures`: Liste des cultures disponibles
- `recipients`: Liste des récipients disponibles
- `selectedCultureId`: ID de la culture sélectionnée
- `selectedRecipientId`: ID du récipient sélectionné
- `onCultureChange`: Callback pour changer la culture
- `onRecipientChange`: Callback pour changer le récipient
- `onSubmit`: Callback de soumission du formulaire
- `isSubmitting`: État de soumission
- `className`: Classes CSS additionnelles

**Fonctionnalités:**
- Validation en temps réel
- Bouton désactivé si conditions non remplies
- Gestion des états de chargement
- Reset automatique après soumission

### MobileMessageZone
Zone d'affichage des messages et erreurs.

**Props:**
- `messages`: Liste des messages à afficher
- `onRemoveMessage`: Callback pour supprimer un message
- `className`: Classes CSS additionnelles

**Types de messages:**
- `success`: Messages de succès (vert)
- `error`: Messages d'erreur (rouge)  
- `info`: Messages d'information (bleu)

**Fonctionnalités:**
- Auto-hide des messages de succès (5 secondes)
- Limitation à 3 messages visibles simultanément
- Animations d'entrée/sortie
- Bouton de fermeture manuel

## Hooks Personnalisés

### useMobileRecoltes
Hook pour récupérer et gérer les données de récoltes.

**Retour:**
- `recoltes`: Liste des récoltes
- `loading`: État de chargement
- `error`: Message d'erreur éventuel
- `refresh`: Fonction de rafraîchissement

**Fonctionnalités:**
- Auto-refresh toutes les 30 secondes
- Gestion des erreurs
- Cache des données
