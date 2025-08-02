"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CultureData {
  id: string;
  nom: string;
  img: string | null;
  categorie: string;
  mode_recolte: string;
}

interface Props {
  initialData: CultureData;
}

/**
 * CultureDetails renders a form allowing the user to view and edit a culture.
 * Changes are only persisted when the update button is pressed.
 */
export const CultureDetails: React.FC<Props> = ({ initialData }) => {
  const router = useRouter();
  const [nom, setNom] = useState(initialData.nom);
  const [categorie, setCategorie] = useState(initialData.categorie);
  const [mode, setMode] = useState(initialData.mode_recolte);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const changed =
    nom !== initialData.nom ||
    categorie !== initialData.categorie ||
    mode !== initialData.mode_recolte;

  const handleUpdate = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/cultures/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          categorie,
          mode_recolte: mode,
          img: initialData.img,
        }),
      });
      if (!res.ok) {
        setMessage("Erreur lors de la mise à jour");
      } else {
        setMessage("Culture mise à jour");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Supprimer cette culture ? Toutes les récoltes associées seront perdues.",
      )
    )
      return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cultures/${initialData.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setMessage("Erreur lors de la suppression");
      } else {
        setMessage("Culture supprimée");
        router.push("/cultures");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {initialData.img && (
        <img
          src={`/images/cultures/${initialData.img}`}
          alt={initialData.nom}
          className="mx-auto w-64 h-64 object-cover rounded-md"
        />
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
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
      {changed && (
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-4 py-2 rounded-md bg-skin-accent text-white font-medium shadow hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      )}
      <button
        onClick={() => router.push(`/recoltes/new?cultureId=${initialData.id}`)}
        className="px-4 py-2 rounded-md bg-skin-muted text-skin-text font-medium shadow"
      >
        Ajouter une récolte
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 rounded-md bg-red-600 text-white font-medium shadow"
      >
        Supprimer la culture
      </button>
      {message && <p className="text-sm text-skin-text/70">{message}</p>}
    </div>
  );
};
