"use client"
import React, { useState, useEffect } from "react";

export default function MobilePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<"soleil" | "lavande">("soleil");

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[var(--color-base)] text-[var(--color-text)] p-4 space-y-6 font-sans">

      {/* 🌱 Zone 1 - Tableau synthèse */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Récoltes cumulées</h2>
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left">
              <th className="cursor-pointer">Nom</th>
              <th className="cursor-pointer">Poids cumulés</th>
              <th className="cursor-pointer">Quantité cumulées</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[var(--color-card)] rounded-md">
              <td className="p-2">Tomate</td>
              <td className="p-2 font-medium">8.4 kg</td>
              <td className="p-2">26</td>
            </tr>
            <tr className="bg-[var(--color-card)] rounded-md">
              <td className="p-2">Courgette</td>
              <td className="p-2 font-medium">6.2 kg</td>
              <td className="p-2">12</td>
            </tr>
            <tr className="bg-[var(--color-card)] rounded-md">
              <td className="p-2">Concombre</td>
              <td className="p-2 font-medium">4.8 kg</td>
              <td className="p-2">15</td>
            </tr>
            <tr className="bg-[var(--color-card)] rounded-md">
              <td className="p-2">Fraise</td>
              <td className="p-2 font-medium">3.6 kg</td>
              <td className="p-2">47</td>
            </tr>
            <tr className="bg-[var(--color-card)] rounded-md">
              <td className="p-2">Aubergine</td>
              <td className="p-2 font-medium">2.9 kg</td>
              <td className="p-2">7</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ➕ Zone 2 - Ajout récolte (dynamique) */}
      <div className="flex flex-col items-center justify-center gap-4">
        {(() => {
          // mockCultures
          const mockCultures = [
            { id: "1", nom: "Tomate", img: "🍅", mode_recolte: "poids_unite" },
            { id: "2", nom: "Courgette", img: "🥒", mode_recolte: "poids" },
            { id: "3", nom: "Fraise", img: "🍓", mode_recolte: "poids_unite" },
          ];
          // Use state for selectedCultureId
          const [selectedCultureId, setSelectedCultureId] = React.useState("1");
          const selectedCulture = mockCultures.find((c) => c.id === selectedCultureId);
          // local state for rerendering on select change
          // We need to return a React node for this IIFE
          return (
            <form
              className="flex flex-col gap-2 w-full max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const poids = formData.get("poids")?.toString() ?? "";
                const quantite = formData.get("quantite")?.toString() ?? "";
                alert(
                  `Récolte enregistrée:\n${selectedCulture?.img} ${selectedCulture?.nom}\nPoids: ${poids} g\nQuantité: ${quantite}`
                );
                form.reset();
              }}
            >
              <select
                name="culture"
                value={selectedCultureId}
                onChange={(e) => setSelectedCultureId(e.target.value)}
                className="px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)]"
              >
                {mockCultures.map((culture) => (
                  <option key={culture.id} value={culture.id}>
                    {culture.img} {culture.nom}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 w-full max-w-sm">
                <input
                  name="poids"
                  type="number"
                  step="1"
                  placeholder="Poids (g)"
                  className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
                  required
                />
                {selectedCulture?.mode_recolte === "poids_unite" && (
                  <input
                    name="quantite"
                    type="number"
                    placeholder="Unités"
                    className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
                    required
                  />
                )}
              </div>

              <button
                type="button"
                className="px-6 py-2 rounded-full border border-dashed border-[var(--color-text)] text-sm"
                onClick={() => alert("Prise de photo pas encore implémentée")}
              >
                📸 Prendre une photo
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[var(--color-accent)] hover:brightness-90 text-[var(--color-base)] font-semibold shadow"
              >
                + Ajouter la récolte
              </button>
            </form>
          );
        })()}
      </div>

      {/* 🎨 Zone 3 - Thèmes + Mode */}
      <div className="flex items-center justify-center gap-8">
        {/* Switch Mode Clair/Sombre */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Clair</span>
          <button
            className="relative w-14 h-8 bg-gray-300 dark:bg-zinc-700 rounded-full transition-colors duration-300"
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            <div
              className={`absolute top-0.5 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                isDarkMode ? "left-6 bg-black text-white" : "left-0.5 bg-white text-yellow-500"
              }`}
            >
              {isDarkMode ? "🌙" : "☀️"}
            </div>
          </button>
          <span className="text-sm">Sombre</span>
        </div>

        {/* Switch Thème */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Soleil</span>
          <button
            //className={`relative w-14 h-8 ${
            //  theme === "soleil" ? "bg-yellow-300" : "bg-indigo-700"
            //} rounded-full transition-colors duration-300`}
            className="relative w-14 h-8 rounded-full transition-colors duraction-30 bg-[var(--color-accent)]"
            onClick={() => setTheme((prev) => (prev === "soleil" ? "lavande" : "soleil"))}
          >
            <div
              className={`absolute top-0.5 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                theme === "soleil"
                  ? "left-0.5 bg-white text-yellow-500"
                  : "left-6 bg-white text-indigo-300"
              }`}
            >
              {theme === "soleil" ? "🌞" : "🌿"}
            </div>
          </button>
          <span className="text-sm">Lavande</span>
        </div>
      </div>
    </div>
  );
}