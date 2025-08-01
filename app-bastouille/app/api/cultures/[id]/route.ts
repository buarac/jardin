import { NextResponse } from "next/server";
import { prisma } from "@lib/db";

interface Params {
  params: { id: string };
}

/**
 * GET /api/cultures/[id]
 * Returns a single culture and its associated recoltes.
 */
export async function GET(_request: Request, { params }: Params) {
  try {
    const culture = await prisma.culture.findUnique({
      where: { id: params.id },
      include: { recoltes: true }
    });
    if (!culture) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(culture);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch culture" }, { status: 500 });
  }
}

/**
 * PUT /api/cultures/[id]
 * Updates a culture with the provided payload.
 */
export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { nom, img, categorie, mode_recolte } = body;
    const culture = await prisma.culture.update({
      where: { id: params.id },
      data: {
        nom,
        img,
        categorie,
        mode_recolte
      }
    });
    return NextResponse.json(culture);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update culture" }, { status: 500 });
  }
}

/**
 * DELETE /api/cultures/[id]
 * Deletes a culture. This will also delete all associated recoltes due to
 * cascade rules defined in the database schema.
 */
export async function DELETE(_request: Request, { params }: Params) {
  try {
    await prisma.culture.delete({ where: { id: params.id } });
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete culture" }, { status: 500 });
  }
}