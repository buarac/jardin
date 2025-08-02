import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class JobLogger {
  private id: number | undefined;

  constructor(private jobName: string, private startedAt: Date) {
    prisma.log_jobs.create({
      data: {
        job_name: this.jobName,
        started_at: this.startedAt,
        status: "PENDING",
        message: "Job démarré",
      },
    }).then((log) => {
      this.id = log.id;
    }).catch((err) => {
      console.error("Erreur lors de la création du log de job:", err);
    });
  }

  public async success(message: string) {
    await this.updateStatus("OK", message);
  }

  public async fail(message: string, error: any) {
    await this.updateStatus("KO", message, JSON.stringify(error, null, 2));
  }

  public async ignore(message: string, error?: any) {
    await this.updateStatus("IGNORED", message, error ? JSON.stringify(error, null, 2) : undefined);
  }

  public async partial(message: string) {
    await this.updateStatus("PARTIAL", message);
  }

  private async updateStatus(
    status: "OK" | "KO" | "IGNORED" | "PARTIAL",
    message: string,
    log?: string
  ) {
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