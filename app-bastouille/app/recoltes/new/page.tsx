"use client";

import { Header } from "../../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const [temperature, setTemperature] = useState('');
  const [humidite, setHumidite] = useState('');
  const [vent, setVent] = useState('');
  const [indiceUv, setIndiceUv] = useState('');
  const [qtePluie, setQtePluie] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/cultures')
      .then((res) => res.json())
      .then((data: any[]) => {
        const simplified = data.map((c) => ({ id: c.id, nom: c.nom, img: c.img, mode_recolte: c.mode_recolte }));
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
      if (temperature) payload.temperature = parseFloat(temperature);
      if (humidite) payload.humidite = parseFloat(humidite);
      if (vent) payload.vent = parseFloat(vent);
      if (indiceUv) payload.indice_uv = parseFloat(indiceUv);
      if (qtePluie) payload.qte_pluie = parseFloat(qtePluie);
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
        setTemperature('');
        setHumidite('');
        setVent('');
        setIndiceUv('');
        setQtePluie('');
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
      <Header title="Ajouter une récolte" backHref="/" />
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Culture selection */}
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
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        {/* Weather fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Température (°C)</label>
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
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
        {message && <p className="text-sm text-skin-text/70">{message}</p>}
      </form>
    </div>
  );
}