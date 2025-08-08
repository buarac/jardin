export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@lib/db";

export async function GET() {
  try {
    const recipients = await prisma.recipient.findMany();
    return NextResponse.json(recipients);
  } catch (error) {
    console.error("[API][RECIPIENTS][GET]", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des recipients." },
      { status: 500 }
    );
  }
}