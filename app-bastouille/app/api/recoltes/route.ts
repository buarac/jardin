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
    const periode = searchParams.get("periode");

    const now = new Date();
    let start: Date | undefined;
    let end: Date | undefined;

    // Gestion du paramètre "periode"
    if (periode) {
      if (periode === "annee") {
        start = new Date(now.getFullYear(), 0, 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(now.getFullYear() + 1, 0, 1);
      } else if (periode === "mois") {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      } else if (periode === "semaine") {
        const current = new Date();
        current.setHours(0, 0, 0, 0);
        start = new Date(current);
        start.setDate(current.getDate() - 6); // inclut aujourd'hui
        end = new Date(current);
        end.setDate(current.getDate() + 1); // inclut toute la journée d'aujourd'hui
        end.setHours(0, 0, 0, 0);
      }
    } else if (yearParam || monthParam) {
      const year = parseInt(yearParam || now.getFullYear().toString());
      const month = monthParam ? parseInt(monthParam) - 1 : 0;

      start = new Date(Date.UTC(year, month, 1));
      start.setHours(0, 0, 0, 0);
      end = monthParam
        ? new Date(Date.UTC(year, month + 1, 1))
        : new Date(Date.UTC(year + 1, 0, 1));
    }

    const where: any = {};
    if (start && end) {
      where.date = { gte: start, lt: end };
    }
    if (categorie) {
      where.culture = { categorie };
    }
    if (cultureId) {
      where.id_culture = cultureId;
    }
    const limitParam = searchParams.get("limit");
    const take = limitParam ? parseInt(limitParam) : undefined;
    const recoltes = await prisma.recolte.groupBy({
      by: ["id_culture"],
      where,
      _sum: {
        poids: true,
      },
    });

    const enriched = await Promise.all(
      recoltes.map(async (r) => {
        const culture = await prisma.culture.findUnique({
          where: { id: r.id_culture },
        });
        return {
          id_culture: r.id_culture,
          poids: r._sum.poids ?? 0,
          culture,
        };
      })
    );
    return NextResponse.json(enriched);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch recoltes" },
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
      temperature,
      humidite,
      vent,
      indice_uv,
      qte_pluie,
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
        temperature: temperature !== undefined ? parseFloat(temperature) : null,
        humidite: humidite !== undefined ? parseFloat(humidite) : null,
        vent: vent !== undefined ? parseFloat(vent) : null,
        indice_uv: indice_uv !== undefined ? parseFloat(indice_uv) : null,
        qte_pluie: qte_pluie !== undefined ? parseFloat(qte_pluie) : null,
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
