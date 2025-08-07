import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import path from "path";
import { prisma } from "@lib/db";
import dotenv from "dotenv";
import { JobLogger } from "@lib/jobs/logs/job-logger";

dotenv.config(); // Charge les variables d'environnement

export async function runJob() {
  const exportBase = process.env.EXPORT_PATH ? path.resolve(process.env.EXPORT_PATH) : path.resolve("./exports");
  //const exportBase = process.env.EXPORT_PATH || "./exports";
  const now = new Date();
  const datePath = `${String(now.getDate()).padStart(2, "0")}_${String(now.getMonth() + 1).padStart(2, "0")}_${now.getFullYear()}`;
  const exportDir = path.join(exportBase, datePath);
  const logger = new JobLogger(); //"exportation_meteo", startJob);

  try {
    // démarrage de la log
    await logger.start("export-db", now);

    // export du jour ?
    if (existsSync(exportDir)) {
      logger.ignore("Export déjà réalisé pour " + datePath);
      return;
    }
    try {
      mkdirSync(exportDir, { recursive: true });
    }
    catch (error: any) { // toutes autres erreurs
        await logger.fail("Erreur de création répertoire export", error );
        return;
    }

    const modelNames = Object.keys(prisma).filter((key) => {
      const val = (prisma as any)[key];
      return typeof val?.findMany === "function";
    });

    let rows;
    let exportContent;
    let count = 0;
    let count_error = 0;
    let cumul_error = "";
    const exportedModels: { model: string; filename: string }[] = [];
    const exportedErrModels: { model: string; filename: string }[] = [];
    for (const modelName of modelNames) {
      try {
        rows = await (prisma as any)[modelName].findMany();
        exportContent = {
          model: modelName,
          rows,
        };
      }
      catch (error: any) { 
        await logger.fail("Erreur d'accès à la BD", error );
        return;
      }      

      count = count + 1;
      const outputPath = join(exportDir, `${modelName}.json`);
      try {
        // uniquement pour test
        /*
        if (modelName === "log_jobs") {
          throw new Error("Erreur simulée pour test");
        }
        */
        // fin test
        writeFileSync(outputPath, JSON.stringify(exportContent, null, 2));
        exportedModels.push({ model: modelName, filename: outputPath });
      }
      catch (error: any) { 
        //await logger.fail("Erreur d'accès à la BD", error );
        //return;
        // erreur d'ecriture du fichier export
        count_error = count_error + 1;
        cumul_error = cumul_error + " " + error;
        exportedErrModels.push({ model: modelName, filename: outputPath });
      }         
    }
    const pourcentage_error = (count_error/count)*100;
    if ( count_error > 0 ) { 
      // tous les fichiers n'ont pas été exporté
      logger.partial(pourcentage_error + "% d'erreur lors de l'export", JSON.stringify(exportedErrModels));
    }
    else {
      logger.success("Tous les modèles ont été exportés avec succès.", JSON.stringify(exportedModels));

    }
    return;
  }
  catch (error: any) { // toutes autres erreurs
    await logger.fail("Erreur technique", error);
    return;
  }
}
