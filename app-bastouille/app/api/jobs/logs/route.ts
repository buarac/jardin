import { NextResponse } from "next/server";
import { prisma } from "@lib/db";

export async function GET() {
    try {
        const logs = await prisma.log_jobs.findMany({
            orderBy: {
                ended_at: "desc",
            },
        });
        return NextResponse.json(logs);
    } catch (error) {
        console.error("[GET /api/jobs/logs]", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}