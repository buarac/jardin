"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Culture {
  id: string;
  nom: string;
  img: string | null;
  mode_recolte: string;
}

interface RecolteData {
  id: number;
  id_culture: string;
  date: string;
  poids: number;
  quantite: number | null;
  temperature: number | null;
  humidite: number | null;
  vent: number | null;
  indice_uv: number | null;
  qte_pluie: number | null;
  culture: Culture;
}

interface Props {
  initialData: RecolteData;
  cultures: Culture[];
}

export const RecolteEditForm: React.FC<Props> = ({ initialData, cultures }) => {
  const router = useRouter();
  const [cultureId, setCultureId] = useState(initialData.id_culture);
  const [poids, setPoids] = useState(initialData.poids.toString());
  const [quantite, setQuantite] = useState(
    initialData.quantite ? initialData.quantite.toString() : "",
  );
  const [dateTime, setDateTime] = useState(() => {
    // convert to local ISO for input
    const date = new Date(initialData.date);
    const tzOff = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOff).toISOString().slice(0, 16);
  });
  const [temperature, setTemperature] = useState(
    initialData.temperature?.toString() ?? "",
  );
  const [humidite, setHumidite] = useState(
    initialData.humidite?.toString() ?? "",
  );
  const [vent, setVent] = useState(initialData.vent?.toString() ?? "");
  const [indiceUv, setIndiceUv] = useState(
    initialData.indice_uv?.toString() ?? "",
  );
  const [qtePluie, setQtePluie] = useState(
    initialData.qte_pluie?.toString() ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedCulture = cultures.find((c) => c.id === cultureId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const payload: any = {
        id_culture: cultureId,
        date: dateTime,
        poids: parseInt(poids),
      };
      if (selectedCulture?.mode_recolte === "poids_unite" && quantite) {
        payload.quantite = parseInt(quantite);
      } else {
        payload.quantite = null;
      }
      if (temperature) payload.temperature = parseFloat(temperature);
      if (humidite) payload.humidite = parseFloat(humidite);
      if (vent) payload.vent = parseFloat(vent);
      if (indiceUv) payload.indice_uv = parseFloat(indiceUv);
      if (qtePluie) payload.qte_pluie = parseFloat(qtePluie);
      const res = await fetch(`/api/recoltes/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setMessage("Erreur lors de la mise à jour");
      } else {
        setMessage("Récolte mise à jour");
        router.push("/recoltes");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Culture</label>
        <select
          value={cultureId}
          onChange={(e) => setCultureId(e.target.value)}
          className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
        >
          {cultures.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
      </div>
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
      {selectedCulture?.mode_recolte === "poids_unite" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre d'unités
          </label>
          <input
            type="number"
            min="0"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Date et heure</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Température (°C)
          </label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Humidité (%)</label>
          <input
            type="number"
            value={humidite}
            onChange={(e) => setHumidite(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vent (km/h)</label>
          <input
            type="number"
            value={vent}
            onChange={(e) => setVent(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Indice UV</label>
          <input
            type="number"
            value={indiceUv}
            onChange={(e) => setIndiceUv(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pluie (mm)</label>
          <input
            type="number"
            value={qtePluie}
            onChange={(e) => setQtePluie(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-md bg-skin-accent text-white font-medium shadow hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Mise à jour..." : "Mettre à jour"}
      </button>
      {message && <p className="text-sm text-skin-text/70">{message}</p>}
    </form>
  );
};
