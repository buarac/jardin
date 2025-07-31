"use client";

import { useEffect, useState, useTransition } from "react";
import type { Culture } from "@/lib/prisma/client";
import { ModeRecolte } from "@/lib/prisma/client";
import { createRecolte } from "@/app/actions/recolteActions";
import { getCurrentWeather } from "@/lib/weather";
import { useRouter } from "next/navigation";

interface Props {
  cultures: Culture[];
  defaultCultureId?: string;
}

/**
 * Form for recording a new harvest. Users can select the culture, enter
 * weight and optional quantity, adjust the datetime, view live weather
 * information and submit the harvest. Upon submission the form triggers
 * a server action to persist the record and returns to the home page.
 */
export default function NewRecolteForm({ cultures, defaultCultureId }: Props) {
  const [cultureId, setCultureId] = useState<string>(defaultCultureId || cultures[0]?.id || "");
  const selectedCulture = cultures.find((c) => c.id === cultureId);
  const [poids, setPoids] = useState(0);
  const [quantite, setQuantite] = useState<number | undefined>(undefined);
  const [date, setDate] = useState(() => {
    const now = new Date();
    // Format as YYYY-MM-DDTHH:mm for datetime-local
    const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    return iso;
  });
  const [weather, setWeather] = useState<{ temperature: number | null; humidity: number | null; pressure: number | null; wind: number | null; uvIndex: number | null; }>({
    temperature: null,
    humidity: null,
    pressure: null,
    wind: null,
    uvIndex: null,
  });
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    // Fetch current weather for Cormeilles-en-Parisis (latitude ~ 48.988, longitude ~ 2.15)
    getCurrentWeather(48.988, 2.15).then((w) => setWeather(w));
  }, []);

  const handleSubmit = () => {
    if (!cultureId || poids <= 0) return;
    startTransition(async () => {
      await createRecolte({
        cultureId,
        date,
        poids: parseFloat(poids.toString()),
        quantite: selectedCulture?.modeRecolte === ModeRecolte.poids_unite ? quantite : undefined,
        meteoTemperature: weather.temperature,
        meteoHumidite: weather.humidity,
        meteoPression: weather.pressure,
        meteoVent: weather.wind,
        meteoUV: weather.uvIndex,
      });
      router.push("/");
    });
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Culture selection */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="culture">
          Culture
        </label>
        <select
          id="culture"
          value={cultureId}
          onChange={(e) => setCultureId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {cultures.map((culture) => (
            <option key={culture.id} value={culture.id} className="capitalize">
              {culture.nom}
            </option>
          ))}
        </select>
      </div>
      {/* Poids */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="poids">
          Poids (en grammes)
        </label>
        <input
          id="poids"
          type="number"
          min="0"
          value={poids.toString()}
          onChange={(e) => setPoids(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      {/* Quantité for poids_unite */}
      {selectedCulture?.modeRecolte === ModeRecolte.poids_unite && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="quantite">
            Nombre d&apos;unités
          </label>
          <input
            id="quantite"
            type="number"
            min="0"
            value={quantite?.toString() || ""}
            onChange={(e) => setQuantite(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}
      {/* Date/time */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="date">
          Date et heure
        </label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      {/* Weather */}
      <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground">
        <div className="flex flex-col items-center">
          <span className="font-medium">T°</span>
          <span>{weather.temperature ?? "—"}°C</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Hum.</span>
          <span>{weather.humidity ?? "—"}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Press.</span>
          <span>{weather.pressure ?? "—"} hPa</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Vent</span>
          <span>{weather.wind ?? "—"} m/s</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">UV</span>
          <span>{weather.uvIndex ?? "—"}</span>
        </div>
      </div>
      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={pending || poids <= 0 || !cultureId || (selectedCulture?.modeRecolte === ModeRecolte.poids_unite && !quantite)}
        className="w-full py-2 rounded-md bg-gold text-white font-medium hover:bg-gold-dark disabled:opacity-50"
      >
        {pending ? "Ajout…" : "Ajouter"}
      </button>
    </div>
  );
}