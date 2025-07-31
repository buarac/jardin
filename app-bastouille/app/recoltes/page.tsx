"use client";

import { Header } from "../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Culture {
  id: string;
  nom: string;
  img: string | null;
  categorie: string;
  mode_recolte: string;
}

interface RecolteEntry {
  id: number;
  date: string;
  poids: number;
  quantite: number | null;
  culture: Culture;
}

export default function RecoltesPage() {
  const [recoltes, setRecoltes] = useState<RecolteEntry[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedCategorie, setSelectedCategorie] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (params: { year?: string; month?: string; categorie?: string } = {}) => {
    setLoading(true);
    try {
      const url = new URL('/api/recoltes', window.location.origin);
      if (params.year) url.searchParams.set('year', params.year);
      if (params.month) url.searchParams.set('month', params.month);
      if (params.categorie) url.searchParams.set('categorie', params.categorie);
      const res = await fetch(url.toString());
      const data = (await res.json()) as RecolteEntry[];
      setRecoltes(data);
      // compute distinct years
      const distinctYears = Array.from(new Set(data.map((r) => new Date(r.date).getFullYear()))).sort((a, b) => b - a);
      setYears(distinctYears);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When filters change, refetch
  useEffect(() => {
    fetchData({ year: selectedYear || undefined, month: selectedMonth || undefined, categorie: selectedCategorie || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth, selectedCategorie]);

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette récolte ?')) return;
    try {
      await fetch(`/api/recoltes/${id}`, { method: 'DELETE' });
      // refresh
      fetchData({ year: selectedYear || undefined, month: selectedMonth || undefined, categorie: selectedCategorie || undefined });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Récoltes" backHref="/" />
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Année</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
            >
              <option value="">Toutes</option>
              {years.map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mois</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
            >
              <option value="">Tous</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m.toString()}>
                  {m.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select
              value={selectedCategorie}
              onChange={(e) => setSelectedCategorie(e.target.value)}
              className="p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
            >
              <option value="">Toutes</option>
              <option value="fruit">Fruits</option>
              <option value="legume">Légumes</option>
              <option value="aromatique">Aromatiques</option>
              <option value="fleur">Fleurs</option>
            </select>
          </div>
          <div className="ml-auto">
            <Link href="/recoltes/new" className="px-4 py-2 rounded-md bg-skin-accent text-white font-medium shadow">
              Ajouter
            </Link>
          </div>
        </div>
        {/* Table of recoltes */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-skin-muted text-left">
                <th className="p-2">Date</th>
                <th className="p-2">Culture</th>
                <th className="p-2">Poids</th>
                <th className="p-2">Quantité</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {recoltes.map((r) => (
                <tr key={r.id} className="border-b border-skin-muted hover:bg-skin-fill">
                  <td className="p-2 whitespace-nowrap">
                    {new Date(r.date).toLocaleDateString('fr-FR')} {new Date(r.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                    <td className="p-2 whitespace-nowrap flex items-center gap-2">
                    {r.culture.img && (
                      <img
                        src={`/images/cultures/${r.culture.img}`}
                        alt={r.culture.nom}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span>{r.culture.nom}</span>
                  </td>
                  <td className="p-2 whitespace-nowrap">{(r.poids / 1000).toFixed(2)} kg</td>
                  <td className="p-2 whitespace-nowrap">
                    {r.culture.mode_recolte === 'poids_unite' && r.quantite !== null ? r.quantite : '-'}
                  </td>
                  <td className="p-2 whitespace-nowrap text-right flex gap-2">
                    <Link
                      href={`/recoltes/${r.id}`}
                      className="text-skin-accent underline text-xs"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 underline text-xs"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {recoltes.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-skin-text/70">
                    {loading ? 'Chargement...' : 'Aucune récolte'}
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