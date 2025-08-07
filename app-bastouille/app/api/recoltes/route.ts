import { NextResponse } from "next/server";
import { prisma } from "@lib/db";

/**
 * GET /api/recoltes
 * Lists recoltes with optional filtering by year, month or category.
 * Query parameters:
 * - year: number (e.g. 2025)
 * - month: number (1-12)
 * - categorie: string (fruit|legume|aromatique|fleur)
 *
 * Records are returned with their associated culture and ordered by date
 * descending (most recent first).
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const anneeParam = searchParams.get("annee");
    const cultureId = searchParams.get("cultureId");
    const groupby = searchParams.get("groupby");

    if (!cultureId) {
      return NextResponse.json([], { status: 200});
    }

    const now = new Date();
    const annee = anneeParam ? parseInt(anneeParam, 10) : now.getFullYear();

    const start = new Date(Date.UTC(annee, 0, 1));
    const end = new Date(Date.UTC(annee + 1, 0, 1));

    if (groupby === "jour" || groupby === "semaine" || groupby === "mois") {
      // Utilisation de Prisma + raw SQL pour groupement dynamique
      const format =
        groupby === "jour"
          ? "%Y-%m-%d"
          : groupby === "mois"
          ? "%Y-%m"
          : "%Y-%u"; // semaine ISO

      const results = await prisma.$queryRaw`
        SELECT 
          to_char(date, ${format}) as periode,
          SUM(poids) as poids
        FROM recolte
        WHERE id_culture = "${cultureId}"
          AND date >= ${start}
          AND date < ${end}
        GROUP BY periode
        ORDER BY periode ASC;
      `;
      return NextResponse.json(results);
    } else {
      // Renvoie brute sans groupement
      const results = await prisma.recolte.findMany({
        where: {
          id_culture: cultureId,
          date: {
            gte: start,
            lt: end,
          },
        },
        orderBy: { date: "asc" },
      });
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des récoltes" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/recoltes
 * Creates a new recolte. Payload must include id_culture, date, poids and
 * optionally quantite and weather metrics.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id_culture,
      date,
      poids,
      quantite,
    } = body;
    const parsedDate = date ? new Date(date) : new Date();
    const poidsInt = parseInt(poids);
    const quantiteInt =
      quantite !== undefined && quantite !== null ? parseInt(quantite) : null;
    const recolte = await prisma.recolte.create({
      data: {
        id_culture,
        date: parsedDate,
        poids: poidsInt,
        quantite: quantiteInt,
      },
    });
    return NextResponse.json(recolte, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create recolte" },
      { status: 500 },
    );
  }
}
