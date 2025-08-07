import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class JobLogger {
  private id: number | undefined;


  public async start(jobName: string, startedAt: Date) {
    await prisma.log_jobs.create({
      data: {
        job_name: jobName,
        started_at: startedAt,
        status: "PENDING",
        message: "Job démarré",
      },
    }).then((log) => {
      //console.log("JobLogger started, log = ",log);
      this.id = log.id;
    }).catch((err) => {
      //console.log("Erreur lors de la création du log de job:", err);
      console.error("Erreur lors de la création du log de job:", err);
    });
    //console.log(`JobLogger started, id = ${this.id}`);
  }

  public async success(message: string, logMsg?: string) {
    await this.updateStatus("OK", message, logMsg ? logMsg : undefined);
  }

  public async fail(message: string, error: any) {
    await this.updateStatus("KO", message, JSON.stringify(error, null, 2));
  }

  public async ignore(message: string, error?: any) {
    await this.updateStatus("IGNORED", message, error ? JSON.stringify(error, null, 2) : undefined);
  }

  public async partial(message: string, logMsg?: string) {
    await this.updateStatus("PARTIAL", message, logMsg ? logMsg : undefined);
  }

  private async updateStatus(
    status: "OK" | "KO" | "IGNORED" | "PARTIAL",
    message: string,
    log?: string
  ) {
    //console.log(`JobLogger: id = ${this.id}`);
    if (!this.id) {
      console.warn("Aucun ID de log disponible. Impossible de mettre à jour le log.");
      return;
    }

    await prisma.log_jobs.update({
      where: { id: this.id },
      data: {
        ended_at: new Date(),
        status,
        message,
        log,
      },
    });
  }
}