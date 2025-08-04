import { PrismaClient } from "@prisma/client";
import { subDays, format } from "date-fns";
import fetch from "node-fetch";
import { JobLogger } from "@lib/jobs/logs/job-logger";

const prisma = new PrismaClient();

// Coordonnées GPS de la localisation
const latitude = 48.9956;
const longitude = 2.2175;

async function main() {
  const startedAt = new Date();
  const logger = new JobLogger();
  const yesterday = subDays(new Date(), 1);
  const dateStr = format(yesterday, "yyyy-MM-dd");

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max,sunrise,sunset,windspeed_10m_max,sunshine_duration,relative_humidity_2m_mean&timezone=auto&start_date=${dateStr}&end_date=${dateStr}`;

  type OpenMeteoDailyResponse = {
    daily: {
      temperature_2m_min: number[];
      temperature_2m_max: number[];
      precipitation_sum: number[];
      uv_index_max: number[];
      sunrise: string[];
      sunset: string[];
      windspeed_10m_max: number[];
      sunshine_duration: number[];
      relative_humidity_2m_mean: number[];
    };
  };
  let json;
  try {

    logger.start("alimentation_meteo", startedAt);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des données météo : ${response.statusText}`);
    }
    json = (await response.json()) as OpenMeteoDailyResponse;

  } catch (error: any) {
    await logger.fail("Erreur d'accès à l'api Open-Meteo", error);
    console.warn("⚠️ Erreur d'accès à l'api Open-Meteo");
    return;
  }

  try {
    json = await (async () => {
      try {
        return json;
      } catch (error: any) {
        await logger.fail("Réponse api Open-Meteo mal formée", error);
        console.warn("⚠️ Réponse api Open-Meteo mal formée");
        return;
      }
    })();
  } catch {
    return;
  }

  if (
    !json?.daily ||
    !json.daily.temperature_2m_min?.length ||
    !json.daily.sunshine_duration?.length
  ) {
    await logger.fail("Réponse api Open-Meteo vide ou incomplete", json);
    console.warn("⚠️ Réponse api Open-Meteo vide ou incomplete");
    return;
  }

  const data = json as {
    daily: {
      temperature_2m_min: number[];
      temperature_2m_max: number[];
      precipitation_sum: number[];
      uv_index_max: number[];
      sunrise: string[];
      sunset: string[];
      windspeed_10m_max: number[];
      sunshine_duration: number[];
      relative_humidity_2m_mean: number[];
    };
  };
  const day = data.daily;

  try {
    await prisma.meteo_jour.create({
      data: {
        date: new Date(dateStr),
        temperature_min: day.temperature_2m_min[0],
        temperature_max: day.temperature_2m_max[0],
        qte_pluie: day.precipitation_sum[0],
        indice_uv: day.uv_index_max[0],
        sunrise: new Date(day.sunrise[0]),
        sunset: new Date(day.sunset[0]),
        vent: day.windspeed_10m_max[0],
        sunshine: day.sunshine_duration[0] / 3600,
        humidite: day.relative_humidity_2m_mean[0],
        source: "Open-Meteo"
      },
    });

    await logger.success("Données météo enregistrées avec succès.");
  } catch (error: any) {
    const msg =
      error.code === "P2002"
        ? "Les données météo pour cette date ont déjà été enregistrées."
        : "Une erreur est survenue pendant l'insertion des données météo.";

    if (error.code === "P2002") {
      await logger.ignore(msg, error);
    } else {
      await logger.fail(msg, error);
    }

    // Exemple d'utilisation de logger.partial() si besoin (non déclenché ici)
    // if (somePartialCondition) {
    //   await logger.partial("Données météo partiellement enregistrées.", partialError);
    // }

    console.warn("⚠️", msg);
    if (error.code !== "P2002") {
      console.error("❌ Erreur technique :", error);
    }

    return;
  }
}

export { main as runJob };