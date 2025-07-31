"use client";

import { useState, useTransition } from "react";
import { Categorie, ModeRecolte } from "@/lib/prisma/client";
import { createCulture } from "@/app/actions/cultureActions";
import { useRouter } from "next/navigation";

/**
 * Form used to create a new culture. It collects the name, category,
 * harvesting mode and an image filename. On submission it calls the
 * appropriate server action and navigates back to the cultures list.
 */
export default function NewCultureForm() {
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState<Categorie>(Categorie.legume);
  const [modeRecolte, setModeRecolte] = useState<ModeRecolte>(ModeRecolte.poids);
  const [img, setImg] = useState("placeholder.png");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = () => {
    startTransition(async () => {
      await createCulture({ nom, categorie, modeRecolte, img });
      router.push("/cultures");
    });
  };

  const canSubmit = nom.trim().length > 0;

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
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="img">
          Nom du fichier image (PNG)
        </label>
        <input
          id="img"
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <span className="text-xs text-muted-foreground">
          Placez votre fichier dans <code>public/cultures</code> et indiquez son nom ici.
        </span>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || pending}
        className="w-full py-2 rounded-md bg-gold text-white font-medium hover:bg-gold-dark disabled:opacity-50"
      >
        {pending ? "Création…" : "Créer"}
      </button>
    </div>
  );
}