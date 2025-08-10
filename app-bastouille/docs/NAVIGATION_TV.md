# Navigation par Télécommande TV

## Vue d'ensemble

Cette fonctionnalité permet de naviguer dans l'application TV avec une télécommande Samsung FrameTV ou similaire. Elle utilise les touches directionnelles et de validation pour naviguer entre les éléments de l'interface.

## Fonctionnalités

### 🎮 Navigation par Télécommande
- **Touches directionnelles** : ↑↓←→ pour naviguer entre les éléments
- **Touche OK/Enter** : Sélectionner/valider l'élément actuel
- **Touche Return** : Retour en arrière (si implémenté)
- **Navigation intelligente** : Le système trouve automatiquement l'élément le plus proche dans la direction choisie

### 📱 Détection Automatique
- Détection de l'environnement TV via User-Agent
- Détection par résolution d'écran (≥1920x1080)
- Adaptation automatique de l'interface

### 🎯 Focus Management
- Focus automatique sur le premier élément au chargement
- Indicateurs visuels de focus avec animations
- Support des attributs d'accessibilité (ARIA)

## Architecture

### Composants Principaux

#### `TVNavigationProvider`
- Gère le contexte de navigation TV
- Détecte l'environnement TV
- Gère les événements clavier
- Maintient l'état du focus

#### `TVFocusableElement`
- Composant générique pour les éléments navigables
- S'enregistre automatiquement dans le système de navigation
- Gère les événements de focus et de clic

#### `TVPeriodButton`
- Bouton spécialisé pour la sélection de période
- Styles adaptés à la navigation TV
- Indicateurs visuels de sélection

#### `TVCultureCard`
- Carte de culture navigable
- Affichage des informations de récolte
- Support de la navigation par télécommande

### Structure des Fichiers

```
app/
├── components/
│   ├── TVNavigationProvider.tsx    # Provider principal
│   ├── TVFocusableElement.tsx      # Élément générique navigable
│   ├── TVPeriodButton.tsx          # Bouton de période
│   ├── TVCultureCard.tsx           # Carte de culture
│   └── TVRemoteInstructions.tsx    # Instructions utilisateur
├── tv/
│   ├── layout.tsx                  # Layout avec provider
│   ├── page.tsx                    # Page principale
│   ├── tv-navigation.css           # Styles spécifiques
│   └── test-navigation.tsx         # Composant de test
```

## Utilisation

### 1. Envelopper l'Application

```tsx
// app/tv/layout.tsx
import { TVNavigationProvider } from "@/components/TVNavigationProvider";

export default function TVLayout({ children }) {
  return (
    <TVNavigationProvider>
      {children}
    </TVNavigationProvider>
  );
}
```

### 2. Créer des Éléments Navigables

```tsx
import { TVFocusableElement } from "@/components/TVFocusableElement";

<TVFocusableElement onClick={() => console.log('Clic!')}>
  Mon élément navigable
</TVFocusableElement>
```

### 3. Utiliser des Composants Spécialisés

```tsx
import { TVPeriodButton } from "@/components/TVPeriodButton";

<TVPeriodButton
  value="annee"
  isSelected={selectedPeriode === "annee"}
  onClick={() => setSelectedPeriode("annee")}
>
  Année
</TVPeriodButton>
```

## Configuration

### Variables CSS

Les styles utilisent les variables CSS de l'application :

```css
:root {
  --color-accent: #6366f1;
  --color-fill: #0f0f23;
  --color-text: #ffffff;
  --color-card: #1e1e3f;
}
```

### Détection TV

Le système détecte automatiquement l'environnement TV via :

1. **User-Agent** : `smart-tv`, `tizen`, `webos`
2. **Résolution** : ≥1920x1080 pixels
3. **Mode développement** : Variable d'environnement

## Tests

### Composant de Test

Le composant `TestNavigation` affiche en temps réel :
- Détection de l'environnement TV
- Index du focus actuel
- Nombre d'éléments navigables

### Test Manuel

1. Ouvrir la page `/tv`
2. Utiliser les touches directionnelles du clavier
3. Vérifier la navigation entre les éléments
4. Tester la sélection avec Enter/Espace

## Dépannage

### Problèmes Courants

#### Navigation ne fonctionne pas
- Vérifier que `TVNavigationProvider` enveloppe la page
- Contrôler la console pour les erreurs JavaScript
- Vérifier que les éléments ont `data-focusable="true"`

#### Focus non visible
- Vérifier l'import du fichier CSS `tv-navigation.css`
- Contrôler les variables CSS personnalisées
- Tester en mode développement

#### Détection TV incorrecte
- Vérifier la résolution de l'écran
- Contrôler le User-Agent du navigateur
- Forcer la détection en mode développement

### Mode Développement

Pour forcer la détection TV en développement :

```tsx
// Dans TVNavigationProvider
const [isTVEnvironment, setIsTVEnvironment] = useState(
  process.env.NODE_ENV === 'development' ? true : false
);
```

## Optimisations Futures

### Fonctionnalités Avancées
- [ ] Support des touches numériques pour accès direct
- [ ] Navigation par grille 2D
- [ ] Support des gestes tactiles
- [ ] Intégration avec l'API Samsung TV

### Performance
- [ ] Lazy loading des composants
- [ ] Optimisation des animations
- [ ] Gestion de la mémoire pour les grandes listes

### Accessibilité
- [ ] Support des lecteurs d'écran
- [ ] Navigation au clavier avancée
- [ ] Contraste et lisibilité améliorés

## Support

Pour toute question ou problème :
1. Vérifier la console du navigateur
2. Consulter les logs de l'application
3. Tester avec le composant `TestNavigation`
4. Vérifier la configuration CSS et des variables
