import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Culture } from "@/lib/prisma/client";

/**
 * API route that returns aggregated statistics for a given year. It sums the
 * weights and quantities of harvests per culture between 1 January and
 * 31 December of the specified year. The response includes the culture
 * details and totals. Example: `/api/stats?year=2024`.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : NaN;
  if (!year || isNaN(year)) {
    return NextResponse.json({ error: "Paramètre 'year' manquant ou invalide" }, { status: 400 });
  }
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31, 23, 59, 59, 999);

  // Group harvests by culture and sum weights and quantities
  const grouped = await prisma?.recolte.groupBy({
    by: ["cultureId"],
    where: { date: { gte: start, lte: end } },
    _sum: {
      poids: true,
      quantite: true,
    },
  });
  interface Stat {
    culture: Culture;
    totalPoids: number;
    totalQuantite: number;
  }
  const results: Stat[] = [];
  for (const g of grouped ?? []) {
    const culture = await prisma?.culture.findUnique({ where: { id: g.cultureId } });
    if (!culture) continue;
    results.push({
      culture,
      totalPoids: g._sum.poids ?? 0,
      totalQuantite: g._sum.quantite ?? 0,
    });
  }
  return NextResponse.json({ results });
}