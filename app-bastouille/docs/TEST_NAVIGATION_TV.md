# Guide de Test - Navigation TV

## Test Manuel Rapide

### Prérequis
- Serveur de développement en cours d'exécution (`npm run dev`)
- Navigateur moderne (Chrome, Firefox, Safari)
- Page `/tv` accessible

### Étapes de Test

#### 1. Test de Base
1. Ouvrir `http://localhost:3000/tv`
2. Attendre le chargement complet (splash screen)
3. Vérifier que le composant de test s'affiche en haut à gauche

#### 2. Test de Navigation Clavier
1. **Focus initial** : Appuyer sur `Tab` pour activer la navigation
2. **Navigation droite** : Appuyer sur `→` (flèche droite)
3. **Navigation bas** : Appuyer sur `↓` (flèche bas)
4. **Sélection** : Appuyer sur `Enter` ou `Espace`

#### 3. Test des Boutons de Période
1. Naviguer entre les boutons avec `←` et `→`
2. Vérifier que le focus se déplace visuellement
3. Sélectionner une période avec `Enter`
4. Vérifier que la sélection change

#### 4. Test des Cartes de Culture
1. Naviguer vers les cartes avec `↓`
2. Vérifier que le focus se déplace entre les cartes
3. Tester la navigation dans la grille 4x4
4. Vérifier les indicateurs visuels de focus

### Indicateurs Visuels à Vérifier

#### ✅ Fonctionne Correctement
- [ ] Focus visible avec contour coloré
- [ ] Animation de scale au focus
- [ ] Navigation fluide entre éléments
- [ ] Sélection fonctionnelle
- [ ] Instructions affichées après 3s

#### ❌ Problèmes à Signaler
- [ ] Focus non visible
- [ ] Navigation bloquée
- [ ] Erreurs dans la console
- [ ] Styles manquants
- [ ] Comportement inattendu

### Test sur Différentes Résolutions

#### Résolution TV (1920x1080+)
- Détection automatique TV
- Styles optimisés
- Navigation complète

#### Résolution Desktop (<1920x1080)
- Détection desktop
- Navigation clavier standard
- Styles adaptés

### Dépannage

#### Navigation ne fonctionne pas
```bash
# Vérifier la console du navigateur
# Rechercher les erreurs JavaScript
# Vérifier que TVNavigationProvider est chargé
```

#### Styles manquants
```bash
# Vérifier l'import CSS dans layout.tsx
# Contrôler les variables CSS
# Vérifier le build Next.js
```

#### Composants non chargés
```bash
# Vérifier les imports
# Contrôler les chemins de composants
# Vérifier la compilation TypeScript
```

### Test Automatisé

Pour un test plus approfondi, utiliser le script Puppeteer :

```bash
# Installer les dépendances
npm install --save-dev puppeteer

# Exécuter le test
node scripts/test-tv-navigation.js
```

### Résultats Attendus

#### Navigation Fluent
- Déplacement fluide entre tous les éléments
- Focus visible et animé
- Sélection fonctionnelle
- Pas de blocage ou de saut

#### Interface Adaptée
- Styles cohérents avec le thème
- Indicateurs visuels clairs
- Responsive sur différentes tailles
- Accessibilité respectée

#### Performance
- Pas de lag lors de la navigation
- Animations fluides
- Chargement rapide des composants
- Pas de fuites mémoire

## Signaler un Problème

En cas de problème, fournir :
1. **Description** : Ce qui ne fonctionne pas
2. **Étapes** : Comment reproduire le problème
3. **Environnement** : Navigateur, OS, résolution
4. **Console** : Erreurs JavaScript
5. **Capture** : Screenshot du problème
