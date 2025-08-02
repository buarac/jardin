import { NextResponse } from "next/server";
import { prisma } from "@lib/db";

/**
 * GET /api/cultures
 * Returns all cultures including their recoltes.
 */
export async function GET() {
  try {
    const cultures = await prisma.culture.findMany({
      include: { recoltes: true },
    });
    return NextResponse.json(cultures);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cultures" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/cultures
 * Creates a new culture with the provided payload.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, img, categorie, mode_recolte } = body;
    const culture = await prisma.culture.create({
      data: {
        nom,
        img: img || null,
        categorie,
        mode_recolte,
      },
    });
    return NextResponse.json(culture, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create culture" },
      { status: 500 },
    );
  }
}
