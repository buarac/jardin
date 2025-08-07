// scripts/pre-build-app.ts

const { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, rmSync } = require("fs");
const { join } = require("path");
require("dotenv").config();

// Détection de l'environnement
const nodeEnv = process.env.NODE_ENV;
const isDev = nodeEnv === "development";

console.log(`🔧 Lancement du script pre-build en mode ${isDev ? "développement" : "production"}`);

// --------------------------
// SECTION: Copy des assets
// --------------------------
function copyRecursiveSync(src: string, dest: string) {
  const entries = readdirSync(src, { withFileTypes: true });

  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

const assetsSource = isDev
  ? join(__dirname, "../dev-assets")
  : join(__dirname, "../prod-assets");
const assetsTarget = join(__dirname, "../public");


// Nettoyage du répertoire public
if (existsSync(assetsTarget)) {
  console.log("🧹 Nettoyage du répertoire public...");
  rmSync(assetsTarget, { recursive: true, force: true });
}

console.log(`📁 Copie des assets depuis ${isDev ? "dev-assets" : "prod-assets"} vers public`);

try {
  copyRecursiveSync(assetsSource, assetsTarget);
  console.log("✅ Assets copiés avec succès.");
} catch (err) {
  console.error("❌ Erreur lors de la copie des assets:", err);
}

// --------------------------
// SECTION: Autres tâches globales (à venir)
// --------------------------

// Exemple placeholder :
// console.log("🔧 Préparation d'autres éléments...");