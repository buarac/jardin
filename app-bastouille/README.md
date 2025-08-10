# 🌱 Baštouille - Application de Gestion de Jardin

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Baštouille** est une application web moderne pour la gestion de votre jardin potager. Suivez vos cultures, enregistrez vos récoltes et analysez vos données avec une interface adaptée à tous les appareils.

## ✨ Fonctionnalités

- 🌱 **Gestion des cultures** : Suivi des plantations et récoltes
- 📱 **Interface responsive** : Mobile, desktop et TV
- 🌤️ **Données météo** : Intégration automatique avec Open-Meteo
- 📊 **Statistiques** : Analyse des récoltes et performances
- 🎨 **Thèmes personnalisables** : Soleil du Sud et Lavande
- 🌙 **Mode sombre/clair** : Adaptation à vos préférences
- 📸 **PWA** : Installation sur mobile et desktop

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- PostgreSQL
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone https://github.com/votre-username/app-bastouille.git
cd app-bastouille

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Générer le client Prisma
npm run generate:client

# Lancer en développement
npm run dev
```

### Accès à l'application
- **Mobile** : `/mobile` - Interface tactile optimisée
- **Desktop** : `/desktop` - Interface complète avec navigation
- **TV** : `/tv` - Interface adaptée aux écrans larges

## 📚 Documentation

- 📖 **[Guide de démarrage](docs/GETTING_STARTED.md)** - Installation et première utilisation
- 👤 **[Guide utilisateur](docs/USER_GUIDE.md)** - Utilisation des fonctionnalités
- 👨‍💻 **[Guide développeur](docs/DEVELOPER_GUIDE.md)** - Contribution et développement
- 🏗️ **[Architecture](docs/ARCHITECTURE.md)** - Structure technique du projet
- 🧩 **[Composants](docs/COMPONENTS.md)** - Catalogue des composants UI
- 🔌 **[Référence API](docs/API_REFERENCE.md)** - Documentation des endpoints
- 🎨 **[Thèmes UI](docs/UI_THEMES.md)** - Personnalisation de l'interface
- 🚀 **[Déploiement](docs/DEPLOYMENT.md)** - Mise en production

## 🛠️ Technologies

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS, shadcn/ui
- **Base de données** : PostgreSQL avec Prisma ORM
- **Météo** : API Open-Meteo
- **Déploiement** : PM2, CRON jobs
- **PWA** : Service Worker, Manifest

## 📱 Captures d'écran

> *Captures à ajouter : interface mobile, desktop, thèmes*

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- 📧 **Email** : support@bastouille.app
- 🐛 **Issues** : [GitHub Issues](https://github.com/votre-username/app-bastouille/issues)
- 📖 **Documentation** : [docs/](docs/)

---

<div align="center">
  <p>🌱 <strong>Baštouille</strong> - Cultivez votre jardin numérique</p>
  <p><em>Développé avec ❤️ pour les jardiniers passionnés</em></p>
</div>
