import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client. In development the client is stored on the global
 * object to prevent spawning multiple connections during hot reloads. In
 * production a new instance is created for each import.
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;