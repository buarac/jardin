import { NextResponse } from "next/server";
import { runJob } from "@lib/jobs/meteo/alimentation"; // on y mettra la logique du job

export async function POST() {
  try {
    const result = await runJob();
    return NextResponse.json({ status: "ok", result });
  } catch (e: any) {
    return NextResponse.json({ status: "error", error: e.message }, { status: 500 });
  }
}