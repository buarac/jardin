# 📘 Standardisation des Jobs dans Baštouille

Ce document définit les **règles et bonnes pratiques** pour la création de **jobs (tâches automatisées)** dans l’application **Baštouille**. Il garantit une exécution cohérente, une gestion des erreurs rigoureuse, et un logging structuré via l’API.

---

## ⚙️ Structure d’un job

Chaque job est un module TypeScript situé dans `lib/jobs/...` et doit **exporter une fonction nommée** :

```ts
export async function runJob() {
  // logique du job
}
```

Cette fonction doit obligatoirement :

- Utiliser le **JobLogger** (voir ci-dessous)
- Capturer l’heure de début dans une variable `startJob = new Date()` et la passer au logger
- Gérer les erreurs proprement avec `try/catch`
- Ne **rien retourner** (les informations passent uniquement par les logs)

---

## 🧾 Gestion des logs via `JobLogger`

L’outil `JobLogger` (dans `lib/jobs/logs/job-logger.ts`) prend en charge l’enregistrement structuré des logs dans la base (`log_jobs`).

### 🔄 Fonctionnement

1. **Démarrage** : capturer la date/heure de début et instancier `JobLogger` :
   ```ts
   const startJob = new Date();
   const logger = new JobLogger("nom_du_job", startJob);
   ```

2. **À la fin du job**, appeler l’une des méthodes suivantes :
   - `logger.success(message)` → succès complet
   - `logger.fail(message, log)` → échec avec message fonctionnel + log technique
   - `logger.partial(message)` → succès partiel
   - `logger.ignore(message, log)` → exécution sans action utile

**Le logger s’occupe automatiquement de créer et mettre à jour l’entrée dans la base.**

---

## 📐 Modèle type (à copier)

```ts
import { JobLogger } from "@/lib/jobs/logs/job-logger";

export async function runJob() {
  const startJob = new Date(); // Doit être capturé ici
  const logger = new JobLogger("nom_du_job", startJob);

  try {
    // logique métier ici...

    await logger.success("Traitement terminé avec succès.");
    return;
  } catch (error: any) {
    await logger.fail("Erreur pendant l’exécution", error.message);
    return;
  }
}
```

---

## 🪧 Statuts de log disponibles

| Statut    | Signification                            | Méthode à appeler               |
|-----------|-------------------------------------------|----------------------------------|
| `OK`      | Job exécuté avec succès                   | `logger.success(...)`           |
| `KO`      | Échec critique empêchant l’exécution      | `logger.fail(...)`              |
| `PARTIAL` | Traitement partiel ou incomplet           | `logger.partial(...)`           |
| `IGNORED` | Exécution inutile ou sans impact          | `logger.ignore(...)`            |

---

## 📁 Organisation des fichiers

| Rôle                         | Chemin                                    |
|------------------------------|-------------------------------------------|
| Log centralisé               | `lib/jobs/logs/job-logger.ts`            |
| Fichier de logique métier    | `lib/jobs/mon-job.ts`                    |
| Déclenchement manuel via API | `app/api/jobs/mon-job/route.ts`          |

---

## 🧱 Règles à respecter

- ✅ **Capturer explicitement** l’heure de début avec `startJob = new Date()`
- ✅ **Nommer le job de façon claire** (ex: `alimentation_meteo`, `exportation_meteo`)
- ❌ **Pas de `console.log`** — utiliser uniquement `JobLogger`
- ❌ **Pas d’accès direct** à `prisma.log_jobs`
- ✅ **Statut de fin clair** (`OK`, `KO`, `PARTIAL`, `IGNORED`)
- ✅ **Toute la logique métier** doit être dans `runJob()`

---

## ✅ Checklist de conformité

| Élément                               | Obligatoire |
|--------------------------------------|-------------|
| Fonction `runJob()` exportée         | ✅          |
| Instanciation de `JobLogger`         | ✅          |
| Log final via `success/fail/...`     | ✅          |
| Gestion d’erreurs avec `try/catch`   | ✅          |
| Pas de `console.log`                 | ✅          |

---

## 🧠 Développement d’un nouveau job

Avant d’écrire le code :

- 🔹 Quel est le **nom** du job ?
- 🔹 Quelle est sa **fonction principale** ?
- 🔹 Quel **message fonctionnel** afficher en cas de succès ?

Puis documenter **tous les cas d’erreur potentiels** :

| Cas d’erreur identifié                       | Statut à logguer | Message fonctionnel              | Détail technique |
|---------------------------------------------|------------------|----------------------------------|------------------|
| Ex: erreur d’accès à la base de données     | KO               | Erreur d’accès à la BDD          | `error.message`  |
| Ex: répertoire export manquant              | KO               | Impossible de créer le dossier   | `error.stack`    |

Une fois la matrice définie, implémenter `runJob()` en respectant le modèle.

---

**Auteur** : ChatGPT & Stefanovic  
**Version** : 1.2 — 2025-08-03