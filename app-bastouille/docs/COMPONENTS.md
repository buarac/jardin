# 🧩 Composants UI - Baštouille

> **Catalogue complet** des composants React et de leur utilisation

## 📋 Table des matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [🏗️ Architecture des composants](#️-architecture-des-composants)
- [🧩 Composants principaux](#-composants-principaux)
- [🎨 Composants de thème](#-composants-de-thème)
- [📱 Composants d'interface](#-composants-dinterface)
- [🔧 Composants utilitaires](#-composants-utilitaires)
- [🎭 Composants shadcn/ui](#-composants-shadcnui)
- [📚 Exemples d'utilisation](#-exemples-dutilisation)
- [🔍 Développement de composants](#-développement-de-composants)

---

## 🎯 Vue d'ensemble

**Baštouille** utilise une architecture de composants **modulaire et réutilisable** basée sur **React 18** et **TypeScript**. Les composants sont organisés par responsabilité et suivent les principes de **design system** pour assurer la cohérence de l'interface.

### 🌟 **Principes de conception**
- **Réutilisabilité** : Composants modulaires et configurables
- **Accessibilité** : Support des lecteurs d'écran et navigation clavier
- **Responsive** : Adaptation automatique à tous les écrans
- **Thèmes** : Support des thèmes Soleil du Sud et Lavande
- **Mode sombre** : Adaptation automatique au mode sombre/clair

---

## 🏗️ Architecture des composants

### **📁 Organisation des dossiers**
```
app/components/
├── ui/                    # Composants shadcn/ui de base
│   ├── button.tsx        # Boutons standardisés
│   ├── card.tsx          # Cartes et conteneurs
│   ├── input.tsx         # Champs de saisie
│   ├── label.tsx         # Labels et étiquettes
│   ├── select.tsx        # Sélecteurs déroulants
│   ├── textarea.tsx      # Zones de texte
│   ├── toggle.tsx        # Interrupteurs
│   └── toggle-group.tsx  # Groupes d'interrupteurs
├── CultureSelector.tsx    # Sélecteur de culture
├── CultureDetails.tsx    # Détails d'une culture
├── RecipientSelector.tsx # Sélecteur de récipient
├── RecolteEditForm.tsx   # Formulaire de récolte
├── WeatherDisplayCard.tsx # Affichage météo
├── Header.tsx            # En-tête de l'application
├── FooterNav.tsx         # Navigation de pied de page
├── MobileNavBar.tsx      # Barre de navigation mobile
├── ThemeProvider.tsx     # Fournisseur de thème
├── ThemeSwitcher.tsx     # Sélecteur de thème
├── Collapsible.tsx       # Sections repliables
└── SplashScreen.tsx      # Écran de démarrage
```

### **🔄 Flux des composants**
```
App Layout
├── ThemeProvider (contexte global)
├── Header (navigation principale)
├── Main Content
│   ├── CultureSelector (sélection)
│   ├── RecipientSelector (sélection)
│   ├── RecolteEditForm (saisie)
│   └── WeatherDisplayCard (affichage)
└── FooterNav (navigation secondaire)
```

---

## 🧩 Composants principaux

### **🌱 CultureSelector**

#### **Description**
Composant de sélection de culture avec images et catégories. Permet de choisir une culture parmi la liste disponible avec une interface visuelle intuitive.

#### **Props**
```typescript
interface CultureSelectorProps {
  cultures: Culture[];           // Liste des cultures disponibles
  selectedCultureId: number | null; // ID de la culture sélectionnée
  onCultureSelect: (cultureId: number) => void; // Callback de sélection
  className?: string;            // Classes CSS optionnelles
}
```

#### **Utilisation**
```tsx
<CultureSelector
  cultures={cultures}
  selectedCultureId={selectedCultureId}
  onCultureSelect={handleCultureSelect}
  className="w-full max-w-md"
/>
```

#### **Fonctionnalités**
- **Affichage des images** : Icônes représentatives pour chaque culture
- **Catégorisation** : Groupement par type (Fruit, Légume, Aromatique, Fleur)
- **Recherche** : Filtrage par nom de culture
- **Sélection visuelle** : Indication claire de la culture choisie

---

### **📦 RecipientSelector**

#### **Description**
Sélecteur de récipient pour les récoltes. Affiche les différents types de récipients disponibles avec leurs poids respectifs.

#### **Props**
```typescript
interface RecipientSelectorProps {
  recipients: Recipient[];       // Liste des récipients
  selectedRecipientId: number | null; // ID du récipient sélectionné
  onRecipientSelect: (recipientId: number) => void; // Callback de sélection
  showWeight?: boolean;          // Afficher le poids du récipient
}
```

#### **Utilisation**
```tsx
<RecipientSelector
  recipients={recipients}
  selectedRecipientId={selectedRecipientId}
  onRecipientSelect={handleRecipientSelect}
  showWeight={true}
/>
```

#### **Fonctionnalités**
- **Images des récipients** : Représentation visuelle de chaque type
- **Poids automatique** : Calcul automatique du poids net
- **Sélection intuitive** : Interface claire et accessible

---

### **✏️ RecolteEditForm**

#### **Description**
Formulaire complet pour l'édition et la création de récoltes. Gère la saisie des données avec validation et calculs automatiques.

#### **Props**
```typescript
interface RecolteEditFormProps {
  cultures: Culture[];           // Cultures disponibles
  recipients: Recipient[];       // Récipients disponibles
  initialData?: Partial<Recolte>; // Données initiales (édition)
  onSubmit: (data: RecolteFormData) => void; // Callback de soumission
  isSubmitting?: boolean;        // État de soumission
}
```

#### **Utilisation**
```tsx
<RecolteEditForm
  cultures={cultures}
  recipients={recipients}
  initialData={recolteToEdit}
  onSubmit={handleSubmit}
  isSubmitting={isSubmitting}
/>
```

#### **Fonctionnalités**
- **Validation des données** : Vérification des champs obligatoires
- **Calcul automatique** : Poids net = Poids brut - Poids récipient
- **Gestion des erreurs** : Affichage des messages d'erreur
- **Mode édition** : Pré-remplissage des champs existants

---

### **🌤️ WeatherDisplayCard**

#### **Description**
Affichage des données météo actuelles et historiques. Présente les informations météorologiques de manière claire et visuelle.

#### **Props**
```typescript
interface WeatherDisplayCardProps {
  weatherData: MeteoJour;       // Données météo
  showDetails?: boolean;         // Afficher les détails complets
  className?: string;            // Classes CSS optionnelles
}
```

#### **Utilisation**
```tsx
<WeatherDisplayCard
  weatherData={currentWeather}
  showDetails={true}
  className="bg-white rounded-lg shadow-md"
/>
```

#### **Fonctionnalités**
- **Données actuelles** : Température, humidité, vent, UV
- **Icônes météo** : Représentation visuelle des conditions
- **Historique** : Évolution sur plusieurs jours
- **Responsive** : Adaptation à tous les écrans

---

## 🎨 Composants de thème

### **🎭 ThemeProvider**

#### **Description**
Fournisseur de contexte pour la gestion des thèmes. Gère l'état global des thèmes et du mode sombre/clair.

#### **Props**
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;     // Composants enfants
  defaultTheme?: 'soleil' | 'lavande'; // Thème par défaut
  defaultMode?: 'light' | 'dark'; // Mode par défaut
}
```

#### **Utilisation**
```tsx
<ThemeProvider defaultTheme="soleil" defaultMode="light">
  <App />
</ThemeProvider>
```

#### **Fonctionnalités**
- **Contexte global** : Accès aux thèmes depuis n'importe où
- **Persistance** : Sauvegarde des préférences utilisateur
- **Synchronisation** : Mise à jour automatique de l'interface

---

### **🎨 ThemeSwitcher**

#### **Description**
Composant de sélection et de basculement entre les thèmes et modes d'affichage.

#### **Props**
```typescript
interface ThemeSwitcherProps {
  className?: string;            // Classes CSS optionnelles
  showLabels?: boolean;          // Afficher les labels
  compact?: boolean;             // Mode compact
}
```

#### **Utilisation**
```tsx
<ThemeSwitcher
  showLabels={true}
  compact={false}
  className="fixed top-4 right-4"
/>
```

#### **Fonctionnalités**
- **Sélection de thème** : Basculement entre Soleil du Sud et Lavande
- **Mode sombre/clair** : Adaptation automatique de l'interface
- **Prévisualisation** : Aperçu des changements en temps réel

---

## 📱 Composants d'interface

### **📱 Header**

#### **Description**
En-tête principal de l'application avec navigation et informations contextuelles.

#### **Props**
```typescript
interface HeaderProps {
  title?: string;                // Titre de la page
  showBackButton?: boolean;      // Afficher le bouton retour
  onBack?: () => void;           // Callback de retour
  children?: React.ReactNode;    // Contenu additionnel
}
```

#### **Utilisation**
```tsx
<Header
  title="Nouvelle récolte"
  showBackButton={true}
  onBack={handleBack}
>
  <ThemeSwitcher />
</Header>
```

---

### **📱 MobileNavBar**

#### **Description**
Barre de navigation optimisée pour les appareils mobiles avec navigation tactile.

#### **Props**
```typescript
interface MobileNavBarProps {
  currentPage: string;           // Page actuelle
  onPageChange: (page: string) => void; // Callback de changement de page
  showHomeButton?: boolean;      // Afficher le bouton accueil
}
```

---

### **📱 FooterNav**

#### **Description**
Navigation de pied de page avec liens vers les sections principales.

#### **Props**
```typescript
interface FooterNavProps {
  currentSection: string;        // Section actuelle
  onSectionChange: (section: string) => void; // Callback de changement
  showStats?: boolean;           // Afficher les statistiques
}
```

---

## 🔧 Composants utilitaires

### **📋 Collapsible**

#### **Description**
Composant de section repliable pour organiser le contenu de manière hiérarchique.

#### **Props**
```typescript
interface CollapsibleProps {
  title: string;                 // Titre de la section
  defaultOpen?: boolean;         // Ouvert par défaut
  children: React.ReactNode;     // Contenu de la section
  className?: string;            // Classes CSS optionnelles
}
```

#### **Utilisation**
```tsx
<Collapsible title="Récoltes récentes" defaultOpen={true}>
  <RecolteList recoltes={recentRecoltes} />
</Collapsible>
```

---

### **🔄 SplashScreen**

#### **Description**
Écran de démarrage affiché pendant le chargement de l'application.

#### **Props**
```typescript
interface SplashScreenProps {
  isLoading: boolean;            // État de chargement
  message?: string;              // Message de chargement
  showProgress?: boolean;        // Afficher la barre de progression
}
```

---

## 🎭 Composants shadcn/ui

### **🔘 Button**

#### **Variantes disponibles**
```tsx
// Bouton principal
<Button variant="default">Action principale</Button>

// Bouton secondaire
<Button variant="secondary">Action secondaire</Button>

// Bouton de destruction
<Button variant="destructive">Supprimer</Button>

// Bouton fantôme
<Button variant="ghost">Action discrète</Button>

// Bouton avec icône
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Ajouter
</Button>
```

---

### **📋 Card**

#### **Utilisation**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description de la carte</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu principal de la carte
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### **📝 Input**

#### **Types disponibles**
```tsx
// Champ texte standard
<Input type="text" placeholder="Saisir du texte" />

// Champ nombre
<Input type="number" min="0" step="0.1" />

// Champ avec label
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

---

### **🔽 Select**

#### **Utilisation**
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choisir une option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

## 📚 Exemples d'utilisation

### **🌱 Formulaire de récolte complet**

```tsx
function RecolteForm() {
  const [selectedCulture, setSelectedCulture] = useState<number | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);
  const [poids, setPoids] = useState<string>('');

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Nouvelle récolte</CardTitle>
        <CardDescription>Enregistrez votre récolte</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CultureSelector
          cultures={cultures}
          selectedCultureId={selectedCulture}
          onCultureSelect={setSelectedCulture}
        />
        
        <RecipientSelector
          recipients={recipients}
          selectedRecipientId={selectedRecipient}
          onRecipientSelect={setSelectedRecipient}
        />
        
        <div>
          <Label htmlFor="poids">Poids (g)</Label>
          <Input
            id="poids"
            type="number"
            value={poids}
            onChange={(e) => setPoids(e.target.value)}
            placeholder="500"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Enregistrer la récolte
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

### **🎨 Interface avec thème**

```tsx
function App() {
  return (
    <ThemeProvider defaultTheme="soleil" defaultMode="light">
      <div className="min-h-screen bg-background text-foreground">
        <Header>
          <ThemeSwitcher />
        </Header>
        
        <main className="container mx-auto px-4 py-8">
          <WeatherDisplayCard
            weatherData={currentWeather}
            showDetails={true}
          />
          
          <Collapsible title="Gestion des cultures" defaultOpen={true}>
            <CultureSelector
              cultures={cultures}
              selectedCultureId={selectedCulture}
              onCultureSelect={setSelectedCulture}
            />
          </Collapsible>
        </main>
        
        <FooterNav
          currentSection="home"
          onSectionChange={setCurrentSection}
        />
      </div>
    </ThemeProvider>
  );
}
```

---

## 🔍 Développement de composants

### **📋 Bonnes pratiques**

#### **1. Structure des composants**
```tsx
// 1. Imports
import React from 'react';
import { cn } from '@/lib/utils';

// 2. Types et interfaces
interface ComponentProps {
  // Props du composant
}

// 3. Composant principal
export function Component({ className, ...props }: ComponentProps) {
  // Logique du composant
  
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Contenu du composant */}
    </div>
  );
}
```

#### **2. Gestion des thèmes**
```tsx
// Utiliser les variables CSS du thème
<div className="bg-background text-foreground border-border">
  <h2 className="text-primary">Titre</h2>
  <p className="text-muted-foreground">Description</p>
</div>
```

#### **3. Responsive design**
```tsx
// Mobile first avec Tailwind
<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
  {/* Contenu adaptatif */}
</div>
```

---

## 🆘 Besoin d'aide ?

### **📖 Documentation**
- 🏗️ [Architecture](ARCHITECTURE.md) - Structure technique
- 👤 [Guide utilisateur](USER_GUIDE.md) - Utilisation
- 👨‍💻 [Guide développeur](DEVELOPER_GUIDE.md) - Contribution

### **🔧 Support technique**
- **Issues GitHub** : [Signaler un problème](../../issues)
- **Composants** : [shadcn/ui](https://ui.shadcn.com/)
- **Tailwind CSS** : [Documentation officielle](https://tailwindcss.com/)

---

<div align="center">
  <p><strong>🧩 Composants modulaires et réutilisables</strong></p>
  <p><em>Explorez la [référence API](API_REFERENCE.md) pour comprendre les données</em></p>
</div>
