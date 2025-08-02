"use client";

import { Header } from "@/components/Header";
import { useEffect, useState } from "react";

interface Culture {
  id: string;
  nom: string;
  img: string | null;
  mode_recolte: string;
}

interface Recolte {
  id: number;
  date: string;
  poids: number;
  quantite: number | null;
  culture: Culture;
}

interface SummaryEntry {
  culture: Culture;
  poids: number;
  quantite: number;
}

export default function StatsPage() {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [summary, setSummary] = useState<SummaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: "poids" | "moyen" | "nom";
    direction: "asc" | "desc";
  }>({
    key: "poids",
    direction: "desc",
  });

  // Fetch all recoltes once to compute years list
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await fetch("/api/recoltes");
        const data = (await res.json()) as Recolte[];
        const distinctYears = Array.from(
          new Set(data.map((r) => new Date(r.date).getFullYear())),
        ).sort((a, b) => b - a);
        setYears(distinctYears);
        if (distinctYears.length > 0) {
          setSelectedYear(distinctYears[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchYears();
  }, []);

  // When selected year or sortConfig changes, compute summary
  useEffect(() => {
    const fetchSummary = async () => {
      if (!selectedYear) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/recoltes?year=${selectedYear}`);
        const data = (await res.json()) as Recolte[];
        const map = new Map<string, SummaryEntry>();
        for (const rec of data) {
          const key = rec.culture.id;
          if (!map.has(key)) {
            map.set(key, { culture: rec.culture, poids: 0, quantite: 0 });
          }
          const entry = map.get(key)!;
          entry.poids += rec.poids;
          if (
            rec.culture.mode_recolte === "poids_unite" &&
            rec.quantite !== null
          ) {
            entry.quantite += rec.quantite;
          }
        }
        const sorted = Array.from(map.values()).sort((a, b) => {
          let valueA: number | string =
            sortConfig.key === "poids"
              ? a.poids
              : sortConfig.key === "moyen"
              ? a.quantite > 0
                ? a.poids / a.quantite
                : 0
              : a.culture.nom.toLowerCase();

          let valueB: number | string =
            sortConfig.key === "poids"
              ? b.poids
              : sortConfig.key === "moyen"
              ? b.quantite > 0
                ? b.poids / b.quantite
                : 0
              : b.culture.nom.toLowerCase();

          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortConfig.direction === "asc"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          } else {
            return sortConfig.direction === "asc"
              ? (valueA as number) - (valueB as number)
              : (valueB as number) - (valueA as number);
          }
        });
        setSummary(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [selectedYear, sortConfig]);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Statistique" backHref="/" />
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Année</label>
          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(
                e.target.value === "" ? "" : parseInt(e.target.value),
              )
            }
            className="p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          >
            <option value="">Choisir</option>
            {years.map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-skin-muted text-left">
                <th
                  className="p-2 cursor-pointer select-none"
                  onClick={() =>
                    setSortConfig((prev) => ({
                      key: "nom",
                      direction:
                        prev.key === "nom" && prev.direction === "desc"
                          ? "asc"
                          : "desc",
                    }))
                  }
                >
                  Culture
                </th>
                <th
                  className="p-2 text-center cursor-pointer select-none"
                  onClick={() =>
                    setSortConfig((prev) => ({
                      key: "poids",
                      direction:
                        prev.key === "poids" && prev.direction === "desc"
                          ? "asc"
                          : "desc",
                    }))
                  }
                >
                  Poids cumulé (kg)
                </th>
                <th
                  className="p-2 text-center cursor-pointer select-none"
                  onClick={() =>
                    setSortConfig((prev) => ({
                      key: "moyen",
                      direction:
                        prev.key === "moyen" && prev.direction === "desc"
                          ? "asc"
                          : "desc",
                    }))
                  }
                >
                  Poids moyen (kg/unité)
                </th>
              </tr>
            </thead>
            <tbody>
              {summary.map((entry) => (
                <tr
                  key={entry.culture.id}
                  className="border-b border-skin-muted"
                >
                  <td className="p-2 flex items-center gap-2 whitespace-nowrap">
                    {entry.culture.img && (
                      <img
                        src={`/images/cultures/${entry.culture.img}`}
                        alt={entry.culture.nom}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span>{entry.culture.nom}</span>
                  </td>
                  <td className="p-2 whitespace-nowrap text-center">
                    {(entry.poids / 1000).toFixed(2)}
                  </td>
                  <td className="p-2 whitespace-nowrap text-center">
                    {entry.culture.mode_recolte === "poids_unite" &&
                    entry.quantite > 0
                      ? (entry.poids / entry.quantite / 1000).toFixed(2)
                      : "-"}
                  </td>
                </tr>
              ))}
              {summary.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-skin-text/70">
                    {loading
                      ? "Chargement..."
                      : "Aucune donnée pour cette année"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
