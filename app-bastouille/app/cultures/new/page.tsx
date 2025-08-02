"use client";

import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCulturePage() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [img, setImg] = useState("");
  const [categorie, setCategorie] = useState("legume");
  const [mode, setMode] = useState("poids");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cultures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          img: img || null,
          categorie,
          mode_recolte: mode,
        }),
      });
      if (!res.ok) {
        setMessage("Erreur lors de la création de la culture");
      } else {
        setMessage("Culture créée");
        router.push("/cultures");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Nouvelle culture" backHref="/cultures" />
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Image (nom du fichier PNG)
          </label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Catégorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          >
            <option value="fruit">Fruit</option>
            <option value="legume">Légume</option>
            <option value="aromatique">Aromatique</option>
            <option value="fleur">Fleur</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Mode de récolte
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full p-2 rounded-md border border-skin-muted bg-skin-fill text-skin-text"
          >
            <option value="poids">Poids</option>
            <option value="poids_unite">Poids & unité</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md bg-skin-accent text-white font-medium shadow hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer"}
        </button>
        {message && <p className="text-sm text-skin-text/70">{message}</p>}
      </form>
    </div>
  );
}
