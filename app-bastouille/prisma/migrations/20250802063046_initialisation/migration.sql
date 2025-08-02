-- CreateEnum
CREATE TYPE "categorie" AS ENUM ('fruit', 'legume', 'aromatique', 'fleur');

-- CreateEnum
CREATE TYPE "moderecolte" AS ENUM ('poids', 'poids_unite');

-- CreateTable
CREATE TABLE "culture" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom" TEXT NOT NULL,
    "img" TEXT,
    "categorie" "categorie" NOT NULL DEFAULT 'legume',
    "mode_recolte" "moderecolte" NOT NULL DEFAULT 'poids',

    CONSTRAINT "culture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recolte" (
    "id" SERIAL NOT NULL,
    "id_culture" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "poids" INTEGER NOT NULL,
    "quantite" INTEGER,
    "temperature" DOUBLE PRECISION,
    "humidite" DOUBLE PRECISION,
    "vent" DOUBLE PRECISION,
    "indice_uv" DOUBLE PRECISION,
    "qte_pluie" DOUBLE PRECISION,

    CONSTRAINT "recolte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meteo_jour" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "temperature_min" DOUBLE PRECISION NOT NULL,
    "temperature_max" DOUBLE PRECISION NOT NULL,
    "humidite" DOUBLE PRECISION NOT NULL,
    "vent" DOUBLE PRECISION NOT NULL,
    "indice_uv" DOUBLE PRECISION NOT NULL,
    "qte_pluie" DOUBLE PRECISION NOT NULL,
    "sunshine" DOUBLE PRECISION NOT NULL,
    "sunrise" TIMESTAMP(3) NOT NULL,
    "sunset" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meteo_jour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_jobs" (
    "id" SERIAL NOT NULL,
    "job_name" TEXT NOT NULL,
    "ok" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "file_path" TEXT,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "log_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meteo_jour_date_key" ON "meteo_jour"("date");

-- AddForeignKey
ALTER TABLE "recolte" ADD CONSTRAINT "recolte_id_culture_fkey" FOREIGN KEY ("id_culture") REFERENCES "culture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
