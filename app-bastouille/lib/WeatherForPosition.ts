// lib/weather.ts
import { WeatherCode } from "@/components/WeatherCodeToLabel";

export async function getWeatherForPosition(date: Date) {
  // Position fixe (Herblay, France)
  const latitude = 48.9909;
  const longitude = 2.1571;

  const isoDate = date.toISOString().split("T")[0];
  const hour = date.getUTCHours();

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,weathercode,windspeed_10m,uv_index,precipitation&timezone=auto&start_date=${isoDate}&end_date=${isoDate}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.hourly) throw new Error("Données météo manquantes");

  console.log("Météo récupérée :", {
    temperature: data.hourly.temperature_2m[hour],
    humidite: data.hourly.relative_humidity_2m[hour],
    vent: data.hourly.windspeed_10m[hour],
    indice_uv: data.hourly.uv_index[hour],
    qte_pluie: data.hourly.precipitation[hour],
    weathercode: data.hourly.weathercode[hour],
  });

  return {
    temperature: data.hourly.temperature_2m[hour],
    humidite: data.hourly.relative_humidity_2m[hour],
    vent: data.hourly.windspeed_10m[hour],
    indice_uv: data.hourly.uv_index[hour],
    qte_pluie: data.hourly.precipitation[hour],
    weathercode: data.hourly.weathercode[hour] as WeatherCode,
  };
}