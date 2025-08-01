"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Thermometer,
  Droplet,
  // add other icons as needed
} from "lucide-react";
import WeatherCodeToLabel, { WeatherCode } from "@/components/WeatherCodeToLabel";

interface CultureItem {
  id: string;
  nom: string;
  img: string | null;
  mode_recolte: string;
}

export default function NewRecoltePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetCultureId = searchParams.get("cultureId");
  const [cultures, setCultures] = useState<CultureItem[]>([]);
  const [cultureId, setCultureId] = useState<string | undefined>(undefined);
  const [poids, setPoids] = useState('');
  const [quantite, setQuantite] = useState('');
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    const tzOff = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - tzOff).toISOString().slice(0, 16);
  });
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidite, setHumidite] = useState<number | null>(null);
  const [vent, setVent] = useState<number | null>(null);
  const [indiceUv, setIndiceUv] = useState<number | null>(null);
  const [qtePluie, setQtePluie] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<WeatherCode | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);

  useEffect(() => {
    fetch('/api/cultures')
      .then((res) => res.json())
      .then((data: any[]) => {
        const simplified = data
          .map((c) => ({ id: c.id, nom: c.nom, img: c.img, mode_recolte: c.mode_recolte }))
          .sort((a, b) => a.nom.localeCompare(b.nom));
        setCultures(simplified);
        if (presetCultureId) {
          setCultureId(presetCultureId);
        } else if (simplified.length > 0) {
          setCultureId(simplified[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, [presetCultureId]);

  const selectedCulture = cultures.find((c) => c.id === cultureId);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoadingWeather(true);
    setMessage(null);
    try {
      const res = await fetch('/api/meteo');
      if (!res.ok) {
        setMessage("Erreur lors de la récupération de la météo");
        setLoadingWeather(false);
        return;
      }
      const data = await res.json();
      setTemperature(data.temperature ?? null);
      setHumidite(data.humidite ?? null);
      setVent(data.vent ?? null);
      setIndiceUv(data.indice_uv ?? null);
      setQtePluie(data.qte_pluie ?? null);
      setWeatherCode((data.weather_code as WeatherCode) ?? null);
    } catch (error) {
      console.error(error);
      setMessage("Erreur inattendue lors de la récupération de la météo");
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cultureId || !poids) {
      setMessage('Veuillez sélectionner une culture et saisir un poids');
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const payload: any = {
        id_culture: cultureId,
        date: dateTime,
        poids: parseInt(poids),
      };
      if (selectedCulture?.mode_recolte === 'poids_unite' && quantite) {
        payload.quantite = parseInt(quantite);
      }
      if (temperature !== null) payload.temperature = temperature;
      if (humidite !== null) payload.humidite = humidite;
      if (vent !== null) payload.vent = vent;
      if (indiceUv !== null) payload.indice_uv = indiceUv;
      if (qtePluie !== null) payload.qte_pluie = qtePluie;
      const res = await fetch('/api/recoltes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        setMessage('Erreur lors de l\'ajout de la récolte');
      } else {
        setMessage('Récolte ajoutée avec succès');
        // reset fields
        setPoids('');
        setQuantite('');
        setTemperature(null);
        setHumidite(null);
        setVent(null);
        setIndiceUv(null);
        setQtePluie(null);
        setWeatherCode(null);
        // Optionally redirect back to home or recoltes page
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Nouvelle récolte" backHref="/" />
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Culture selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Culture</label>
          <Select onValueChange={(val) => setCultureId(val)} defaultValue={cultureId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir une culture" />
            </SelectTrigger>
            <SelectContent>
              {cultures.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  <div className="flex items-center gap-2">
                    {c.img && (
                      <img
                        src={`/images/cultures/${c.img}`}
                        alt={c.nom}
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    <span>{c.nom}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Poids */}
        <div>
          <label className="block text-sm font-medium mb-1">Poids (g)</label>
          <input
            type="number"
            min="0"
            required
            value={poids}
            onChange={(e) => setPoids(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        {/* Quantité for poids_unite */}
        {selectedCulture?.mode_recolte === 'poids_unite' && (
          <div>
            <label className="block text-sm font-medium mb-1">Nombre d'unités</label>
            <input
              type="number"
              min="0"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
            />
          </div>
        )}
        {/* Date/time */}
        <div>
          <label className="block text-sm font-medium mb-1">Date et heure</label>
          <span className="block w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text/70">
            {new Date(dateTime).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        {/* Weather display if present */}
        {(temperature !== null || humidite !== null || vent !== null || indiceUv !== null || qtePluie !== null || weatherCode !== null) && (
          <div className="p-4 rounded-md border border-skin-muted bg-skin-fill/50 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
            {weatherCode !== null && (
              <div className="flex flex-col items-center justify-center">
                <WeatherCodeToLabel code={weatherCode as WeatherCode} large={true} hideText={true} />
              </div>
            )}
            {temperature !== null && (
              <div className="flex flex-col items-center justify-center">
                <Thermometer className="w-6 h-6" />
                <span className="text-sm">{temperature.toFixed(1)}°C</span>
              </div>
            )}
            {humidite !== null && (
              <div className="flex flex-col items-center justify-center">
                <Droplet className="w-6 h-6" />
                <span className="text-sm">{humidite.toFixed(0)}%</span>
              </div>
            )}
            {vent !== null && (
              <div className="flex flex-col items-center justify-center">
                <Wind className="w-6 h-6" />
                <span className="text-sm">{vent.toFixed(1)} km/h</span>
              </div>
            )}
            {indiceUv !== null && (
              <div className="flex flex-col items-center justify-center">
                <Sun className="w-6 h-6" />
                <span className="text-sm">{indiceUv.toFixed(0)}</span>
              </div>
            )}
            {qtePluie !== null && (
              <div className="flex flex-col items-center justify-center">
                <CloudRain className="w-6 h-6" />
                <span className="text-sm">{qtePluie.toFixed(1)} mm</span>
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md bg-skin-accent text-white font-medium shadow hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
        {message && <p className="text-sm text-skin-text/70">{message}</p>}
      </form>
    </div>
  );
}