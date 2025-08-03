# 📘 Documentation du projet *app-bastouille*

## Table des matières

### 1. Introduction
- [1.1 Objectif du projet](#11-objectif-du-projet)
- [1.2 Public cible](#12-public-cible)
- [1.3 Technologies utilisées](#13-technologies-utilisées)

### 2. Structure du projet
- [2.1 Arborescence des dossiers](#21-arborescence-des-dossiers)
- [2.2 Fonctionnement général](#22-fonctionnement-général)

### 3. Fonctionnalités principales
- [3.1 Gestion des cultures](#31-gestion-des-cultures)
- [3.2 Gestion des récoltes](#32-gestion-des-récoltes)
- [3.3 Données météo (Open-Meteo)](#33-données-météo-(open-meteo))
- [3.4 Tableau de bord et statistiques](#34-tableau-de-bord-et-statistiques)
- [3.5 Interface mobile vs desktop](#35-interface-mobile-vs-desktop)

### 4. Composants techniques
- [4.1 API REST](#41-api-rest)
- [4.2 Prisma ORM et base de données](#42-prisma-orm-et-base-de-données)
- [4.3 Système de Jobs (alimentation météo)](#43-système-de-jobs-(alimentation-météo))
- [4.4 Thème et dark mode](#44-thème-et-dark-mode)
- [4.5 Composants UI (shadcn/ui, Tailwind)](#45-composants-ui-(shadcn/ui,-tailwind))
- [4.6 PWA et installation sur iPhone](#46-pwa-et-installation-sur-iphone)

### 5. Déploiement et production
- [5.1 Configuration PM2](#51-configuration-pm2)
- [5.2 Tâches CRON avec PM2](#52-tâches-cron-avec-pm2)
- [5.3 Configuration des environnements](#53-configuration-des-environnements)

### 6. Développement et tests
- [6.1 Lancer en mode développement](#61-lancer-en-mode-développement)
- [6.2 Lancer un build de production](#62-lancer-un-build-de-production)
- [6.3 Tests manuels et debugging](#63-tests-manuels-et-debugging)

### 7. Perspectives d’évolution
- [7.1 Fonctionnalités à venir](#71-fonctionnalités-à-venir)
- [7.2 Améliorations possibles](#72-améliorations-possibles)

### Annexes
- [A.1 Exemple de fichier .env](#a1-exemple-de-fichier-env)
- [A.2 Requête API typique](#a2-requête-api-typique)
- [A.3 Astuces de développement](#a3-astuces-de-développement)
	