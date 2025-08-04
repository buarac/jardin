import { prisma } from "@lib/db";
import { JobLogger } from "@lib/jobs/logs/job-logger";
import fs from "fs/promises";
import path from "path";

export async function runJob() {
  const startJob = new Date();
  const logger = new JobLogger(); //"exportation_meteo", startJob);

  try {
    await logger.start("exportation_meteo", startJob);


    let records;
    try {
        records = await prisma.meteo_jour.findMany();
    }
    catch (error: any) {
      await logger.fail("Erreur d'accès à la BD", error );
      return;
    }

    const now = new Date();
    const filename = `meteo_jour_${now
      .getDate()
      .toString()
      .padStart(2, "0")}_${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}_${now.getFullYear()}.json`;

    const exportDir = process.env.EXPORT_PATH ? path.resolve(process.env.EXPORT_PATH) : path.resolve("./exports");
    const exportPath = path.join(exportDir, filename);

    // creation repertoire d'export
    try {
      await fs.mkdir(exportDir, { recursive: true });
    } 
    catch (error: any) {
      await logger.fail("Erreur de création du répertoire d'export", error );
      return;
    }

    // ecriture du fichier json
    let message_ok = `Nombre de ligne exportées: ${records.length} dans ${exportPath}`;
    try {
      const alreadyExists = await fs.access(exportPath).then(() => true).catch(() => false);
      if ( alreadyExists ) {
        message_ok = "[REGENERE] " + message_ok;
      } else {
        message_ok = "[GENERE] " + message_ok;
      }
      await fs.writeFile(exportPath, JSON.stringify(records, null, 2), "utf-8");
    } 
    catch (error: any) {
      await logger.fail("Erreur de création du fichier d'export", error);
      return;
    }
    console.log(message_ok);
    await logger.success(message_ok);
    return;
  } 
  catch (error: any) { // toutes autres erreurs
    await logger.fail("Erreur technique", error);
    return;
  }
}