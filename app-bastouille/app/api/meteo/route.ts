import { NextResponse } from "next/server";
import { getWeatherForPosition } from "@lib/WeatherForPosition";

export async function GET() {
  try {
    const now = new Date();
    const weather = await getWeatherForPosition(now);
    return NextResponse.json(weather);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur météo" }, { status: 500 });
  }
}
