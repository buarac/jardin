"use client";

import { useState, useTransition } from "react";
import { Culture, Categorie, ModeRecolte } from "@/lib/prisma/client";
import { updateCulture } from "@/app/actions/cultureActions";
import { useRouter } from "next/navigation";

interface Props {
  culture: Culture;
}

/**
 * Form component to edit a culture's details. This client component holds
 * local state for the culture fields and calls the server action to
 * persist changes. A button appears only when at least one field has been
 * modified. Another button allows navigating directly to the add harvest
 * page with the culture preselected.
 */
export default function CultureDetail({ culture }: Props) {
  const [nom, setNom] = useState(culture.nom);
  const [categorie, setCategorie] = useState<Categorie>(culture.categorie);
  const [modeRecolte, setModeRecolte] = useState<ModeRecolte>(culture.modeRecolte);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const hasChanged =
    nom !== culture.nom ||
    categorie !== culture.categorie ||
    modeRecolte !== culture.modeRecolte;

  const handleUpdate = async () => {
    startTransition(async () => {
      await updateCulture(culture.id, {
        nom,
        categorie,
        modeRecolte,
      });
      router.refresh();
    });
  };

  const handleAddHarvest = () => {
    router.push(`/recoltes?cultureId=${culture.id}`);
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="nom">
          Nom de la culture
        </label>
        <input
          id="nom"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-dark"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="categorie">
          Catégorie
        </label>
        <select
          id="categorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value as Categorie)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {Object.values(Categorie).map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="modeRecolte">
          Mode de récolte
        </label>
        <select
          id="modeRecolte"
          value={modeRecolte}
          onChange={(e) => setModeRecolte(e.target.value as ModeRecolte)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {Object.values(ModeRecolte).map((mode) => (
            <option key={mode} value={mode} className="capitalize">
              {mode === ModeRecolte.poids ? "Poids" : "Poids + unité"}
            </option>
          ))}
        </select>
      </div>
      {hasChanged && (
        <button
          onClick={handleUpdate}
          disabled={pending}
          className="w-full py-2 rounded-md bg-gold text-white font-medium hover:bg-gold-dark disabled:opacity-50"
        >
          {pending ? "Mise à jour…" : "Mettre à jour"}
        </button>
      )}
      <button
        onClick={handleAddHarvest}
        className="w-full py-2 rounded-md bg-kaki text-gold font-medium hover:bg-kaki-dark"
      >
        Ajouter une récolte
      </button>
    </div>
  );
}