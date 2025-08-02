/*
  Warnings:

  - You are about to drop the column `file_path` on the `log_jobs` table. All the data in the column will be lost.
  - You are about to drop the column `ok` on the `log_jobs` table. All the data in the column will be lost.
  - Changed the type of `status` on the `log_jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `ended_at` on table `log_jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "job_status" AS ENUM ('OK', 'KO', 'IGNORED', 'PARTIAL');

-- AlterTable
ALTER TABLE "log_jobs" DROP COLUMN "file_path",
DROP COLUMN "ok",
ADD COLUMN     "log" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "job_status" NOT NULL,
ALTER COLUMN "started_at" DROP DEFAULT,
ALTER COLUMN "ended_at" SET NOT NULL;
