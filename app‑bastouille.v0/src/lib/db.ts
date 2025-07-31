import { PrismaClient } from "@/lib/prisma/client";

/**
 * A singleton Prisma client. In a development environment Next.js will
 * hot‑reload modules on every request which would normally create a new
 * database connection each time. To avoid exhausting the PostgreSQL
 * connection pool we attach the Prisma client to the global object. In
 * production, a single instance is sufficient.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma:
  | PrismaClient
  | undefined =
    globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}