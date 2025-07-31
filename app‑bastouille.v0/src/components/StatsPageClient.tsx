"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Culture {
  id: string;
  nom: string;
  img: string;
  categorie: string;
  modeRecolte: string;
}

interface StatResult {
  culture: Culture;
  totalPoids: number;
  totalQuantite: number;
}

interface Props {
  years: number[];
}

/**
 * Client component for the statistics page. It manages the selection of
 * years and fetches aggregated data from the API when the selection
 * changes. Results are displayed in a table with totals converted to
 * kilograms and unit counts shown when applicable.
 */
export default function StatsPageClient({ years }: Props) {
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [stats, setStats] = useState<StatResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedYear) return;
    setLoading(true);
    fetch(`/api/stats?year=${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data.results || []);
        setLoading(false);
      });
  }, [selectedYear]);

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="annee">Année</label>
          <select
            id="annee"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
      </div>
      {loading ? (
        <p className="text-muted-foreground text-sm">Chargement des statistiques…</p>
      ) : stats.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Aucune récolte pour l&apos;année sélectionnée.
        </p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Culture</th>
              <th className="py-2">Poids (kg)</th>
              <th className="py-2">Qté</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(({ culture, totalPoids, totalQuantite }) => (
              <tr key={culture.id} className="border-b last:border-b-0">
                <td className="py-2 flex items-center gap-3">
                  <Image
                    src={`/cultures/${culture.img || "placeholder.png"}`}
                    alt={culture.nom}
                    width={32}
                    height={32}
                    className="rounded-sm object-cover"
                  />
                  <span className="font-medium text-kaki-dark">{culture.nom}</span>
                </td>
                <td className="py-2">
                  {(totalPoids / 1000).toFixed(2)}
                </td>
                <td className="py-2">
                  {culture.modeRecolte === 'poids_unite' ? totalQuantite : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}