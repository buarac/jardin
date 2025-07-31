"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Creates a new harvest (récolte) in the database. Dates are provided as
 * ISO strings so they can be constructed on the client using `input[type=
 * "datetime-local"]`. All weight values should be provided in grams. The
 * weather data are optional and will be stored alongside the harvest.
 */
export async function createRecolte(params: {
  cultureId: string;
  date: string;
  poids: number;
  quantite?: number;
  meteoTemperature?: number | null;
  meteoHumidite?: number | null;
  meteoPression?: number | null;
  meteoVent?: number | null;
  meteoUV?: number | null;
}) {
  const dateObj = new Date(params.date);
  await prisma?.recolte.create({
    data: {
      cultureId: params.cultureId,
      date: dateObj,
      poids: params.poids,
      quantite: params.quantite ?? null,
      meteoTemperature: params.meteoTemperature ?? null,
      meteoHumidite: params.meteoHumidite ?? null,
      meteoPression: params.meteoPression ?? null,
      meteoVent: params.meteoVent ?? null,
      meteoUV: params.meteoUV ?? null,
    },
  });
  // Revalidate pages that depend on harvest data
  revalidatePath("/");
  revalidatePath("/statistiques");
  revalidatePath(`/cultures/${params.cultureId}`);
}