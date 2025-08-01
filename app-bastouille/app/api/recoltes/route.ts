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
    const yearParam = searchParams.get("year");
    const monthParam = searchParams.get("month");
    const categorie = searchParams.get("categorie");
    const cultureId = searchParams.get("cultureId");

    const where: any = {};
    // Filter by date range if year and/or month provided
    if (yearParam) {
      const year = parseInt(yearParam);
      if (!Number.isNaN(year)) {
        // range from Jan 1 to Dec 31 inclusive
        let start = new Date(Date.UTC(year, 0, 1));
        let end = new Date(Date.UTC(year + 1, 0, 1));
        where.date = { gte: start, lt: end };
      }
    }
    if (monthParam) {
      const month = parseInt(monthParam) - 1;
      const nowYear = yearParam ? parseInt(yearParam) : new Date().getFullYear();
      if (!Number.isNaN(month)) {
        let start = new Date(Date.UTC(nowYear, month, 1));
        let end = new Date(Date.UTC(nowYear, month + 1, 1));
        where.date = { gte: start, lt: end };
      }
    }
    // Filter by categorie if provided (delegated to culture relation)
    if (categorie) {
      where.culture = { categorie };
    }
    // Filter by cultureId if provided
    if (cultureId) {
      where.id_culture = cultureId;
    }
    const limitParam = searchParams.get("limit");
    const take = limitParam ? parseInt(limitParam) : undefined;
    const recoltes = await prisma.recolte.findMany({
      where,
      include: { culture: true },
      orderBy: { date: "desc" },
      take
    });
    return NextResponse.json(recoltes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch recoltes" }, { status: 500 });
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
      temperature,
      humidite,
      vent,
      indice_uv,
      qte_pluie
    } = body;
    const parsedDate = date ? new Date(date) : new Date();
    const poidsInt = parseInt(poids);
    const quantiteInt = quantite !== undefined && quantite !== null ? parseInt(quantite) : null;
    const recolte = await prisma.recolte.create({
      data: {
        id_culture,
        date: parsedDate,
        poids: poidsInt,
        quantite: quantiteInt,
        temperature: temperature !== undefined ? parseFloat(temperature) : null,
        humidite: humidite !== undefined ? parseFloat(humidite) : null,
        vent: vent !== undefined ? parseFloat(vent) : null,
        indice_uv: indice_uv !== undefined ? parseFloat(indice_uv) : null,
        qte_pluie: qte_pluie !== undefined ? parseFloat(qte_pluie) : null
      }
    });
    return NextResponse.json(recolte, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create recolte" }, { status: 500 });
  }
}