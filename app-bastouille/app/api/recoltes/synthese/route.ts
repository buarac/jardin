import { prisma } from "@lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const periode = searchParams.get("periode");
  const limitParam = searchParams.get("limit");
  const orderParam = searchParams.get("order");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const week = getISOWeekNumber(now);

  const limit = limitParam ? parseInt(limitParam, 10) : 20;
  const order = orderParam === "asc" ? "asc" : "desc";

  if (!periode || !["annee", "mois", "semaine"].includes(periode)) {
    return NextResponse.json({ error: "Invalid periode" }, { status: 400 });
  }

  const where: any = {
    date: {
      gte: getPeriodStart(periode, year, month, week),
      lt: getPeriodEnd(periode, year, month, week),
    },
  };

  const result = await prisma.recolte.groupBy({
    by: ["id_culture"],
    where,
    _sum: {
      poids: true,
    },
    orderBy: {
      _sum: {
        poids: order,
      },
    },
    take: limit,
  });

  const ids = result.map((r) => r.id_culture);

  const cultures = await prisma.culture.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      id: true,
      nom: true,
      img: true,
      categorie: true,
      mode_recolte: true,
    },
  });

  const enriched = result.map((item) => {
    const culture = cultures.find((c) => c.id === item.id_culture);
    return {
      id_culture: item.id_culture,
      poids: item._sum.poids || 0,
      culture,
    };
  });


  return NextResponse.json(enriched);
}

function getPeriodStart(periode: string, year: number, month: number, week: number) {
  if (periode === "annee") {
    return new Date(`${year}-01-01T00:00:00Z`);
  }
  if (periode === "mois") {
    return new Date(`${year}-${String(month).padStart(2, "0")}-01T00:00:00Z`);
  }
  if (periode === "semaine") {
    return getDateOfISOWeek(week, year);
  }
}

function getPeriodEnd(periode: string, year: number, month: number, week: number) {
  if (periode === "annee") {
    return new Date(`${year + 1}-01-01T00:00:00Z`);
  }
  if (periode === "mois") {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextMonthYear = month === 12 ? year + 1 : year;
    return new Date(`${nextMonthYear}-${String(nextMonth).padStart(2, "0")}-01T00:00:00Z`);
  }
  if (periode === "semaine") {
    const start = getDateOfISOWeek(week, year);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return end;
  }
}

function getDateOfISOWeek(week: number, year: number) {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getUTCDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setUTCDate(simple.getUTCDate() - simple.getUTCDay() + 1);
  else ISOweekStart.setUTCDate(simple.getUTCDate() + 8 - simple.getUTCDay());
  return ISOweekStart;
}

function getISOWeekNumber(date: Date) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
}