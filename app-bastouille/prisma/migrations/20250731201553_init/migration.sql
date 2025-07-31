-- CreateEnum
CREATE TYPE "categorie" AS ENUM ('fruit', 'legume', 'aromatique', 'fleur');

-- CreateEnum
CREATE TYPE "moderecolte" AS ENUM ('poids', 'poids_unite');

-- CreateTable
CREATE TABLE "culture" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "img" TEXT,
    "categorie" "categorie" NOT NULL DEFAULT 'legume',
    "mode_recolte" "moderecolte" NOT NULL DEFAULT 'poids',

    CONSTRAINT "culture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recolte" (
    "id" SERIAL NOT NULL,
    "id_culture" TEXT NOT NULL,
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

-- AddForeignKey
ALTER TABLE "recolte" ADD CONSTRAINT "recolte_id_culture_fkey" FOREIGN KEY ("id_culture") REFERENCES "culture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
