import axios from "axios";

/**
 * Fetches the current weather conditions for a given latitude and longitude
 * using the Open‑Meteo API. Open‑Meteo does not require an API key and
 * returns current values for temperature, relative humidity, surface pressure,
 * wind speed and UV index when requested via the `current` parameter.
 *
 * If you need to switch to a different weather service (e.g. OpenWeatherMap),
 * read the README and set the `WEATHER_API_KEY` environment variable. In that
 * case you should also adjust the request below accordingly.
 *
 * @param latitude Latitude in decimal degrees
 * @param longitude Longitude in decimal degrees
 * @returns Weather object with temperature (°C), humidity (%), pressure (hPa),
 *          wind speed (m/s) and UV index (0–11+)
 */
export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<{
  temperature: number | null;
  humidity: number | null;
  pressure: number | null;
  wind: number | null;
  uvIndex: number | null;
}> {
  try {
    // Use Open‑Meteo's free API. See https://open-meteo.com/en/docs for details.
    // We request the current values for several variables. The API returns
    // arrays under the `current` object (one entry per requested variable).
    const url = `https://api.open-meteo.com/v1/forecast`;
    const params = {
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "surface_pressure",
        "wind_speed_10m",
        "uv_index",
      ].join(","),
    };
    const response = await axios.get(url, { params });
    const data = response.data;
    const current = data.current || {};

    // Extract each variable from the response. Values are arrays of length 1.
    const temperature =
      current.temperature_2m?.[0] ?? null;
    const humidity = current.relative_humidity_2m?.[0] ?? null;
    const pressure = current.surface_pressure?.[0] ?? null;
    const wind = current.wind_speed_10m?.[0] ?? null;
    const uvIndex = current.uv_index?.[0] ?? null;
    return { temperature, humidity, pressure, wind, uvIndex };
  } catch (error) {
    console.error("Error fetching weather", error);
    return {
      temperature: null,
      humidity: null,
      pressure: null,
      wind: null,
      uvIndex: null,
    };
  }
}