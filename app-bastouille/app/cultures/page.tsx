"use client";

import { Header } from "../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Recolte {
  id: number;
  date: string;
  poids: number;
}

interface Culture {
  id: string;
  nom: string;
  img: string | null;
  categorie: string;
  mode_recolte: string;
  recoltes: Recolte[];
}

async function fetchCultures(): Promise<Culture[]> {
  const res = await fetch(`/api/cultures`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error fetching cultures');
  return (await res.json()) as Culture[];
}

export default function CulturesPage() {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchCultures()
      .then((data) => setCultures(data))
      .catch((err) => console.error(err));
  }, []);

  const currentYear = new Date().getFullYear();
  const filtered = cultures.filter((c) =>
    c.nom.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Cultures" />
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher une culture..."
          className="w-full p-2 mb-4 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="space-y-3">
          {filtered.map((c) => {
            // compute cumulative weight for current year in kg
            const totalPoids = c.recoltes
              .filter((r) => new Date(r.date).getFullYear() === currentYear)
              .reduce((acc, r) => acc + r.poids, 0);
            return (
              <Link
                key={c.id}
                href={`/cultures/${c.id}`}
                className="flex items-center gap-4 p-3 rounded-lg bg-skin-card shadow-sm hover:bg-skin-fill transition"
              >
                {c.img && (
                  <img
                    src={`/images/cultures/${c.img}`}
                    alt={c.nom}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium">{c.nom}</div>
                  <div className="text-xs text-skin-text/70 capitalize">{c.categorie}</div>
                </div>
                <div className="text-sm text-right whitespace-nowrap">
                  {(totalPoids / 1000).toFixed(1)} kg
                </div>
              </Link>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-skin-text/70">Aucune culture trouvée.</p>
          )}
          <div className="flex justify-end pt-4">
            <Link
              href="/cultures/new"
              className="px-4 py-2 rounded-md bg-skin-accent text-white font-medium shadow"
            >
              Ajouter une culture
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}