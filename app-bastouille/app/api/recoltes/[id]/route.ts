import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params {
  params: { id: string };
}

/**
 * GET /api/recoltes/[id]
 * Returns a single recolte with its culture relation.
 */
export async function GET(_req: Request, { params }: Params) {
  try {
    const id = parseInt(params.id);
    const recolte = await prisma.recolte.findUnique({
      where: { id },
      include: { culture: true }
    });
    if (!recolte) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(recolte);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch recolte" }, { status: 500 });
  }
}

/**
 * PUT /api/recoltes/[id]
 * Updates an existing recolte.
 */
export async function PUT(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id);
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
    const updateData: any = {};
    if (id_culture) updateData.id_culture = id_culture;
    if (date) updateData.date = new Date(date);
    if (poids !== undefined) updateData.poids = parseInt(poids);
    if (quantite !== undefined) updateData.quantite = quantite !== null ? parseInt(quantite) : null;
    if (temperature !== undefined) updateData.temperature = parseFloat(temperature);
    if (humidite !== undefined) updateData.humidite = parseFloat(humidite);
    if (vent !== undefined) updateData.vent = parseFloat(vent);
    if (indice_uv !== undefined) updateData.indice_uv = parseFloat(indice_uv);
    if (qte_pluie !== undefined) updateData.qte_pluie = parseFloat(qte_pluie);
    const recolte = await prisma.recolte.update({ where: { id }, data: updateData });
    return NextResponse.json(recolte);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update recolte" }, { status: 500 });
  }
}

/**
 * DELETE /api/recoltes/[id]
 * Deletes a recolte entry.
 */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = parseInt(params.id);
    await prisma.recolte.delete({ where: { id } });
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete recolte" }, { status: 500 });
  }
}