"use client"
import React, { useState, useEffect } from "react";

export default function MobilePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<"soleil" | "lavande">("soleil");
  const [selectedPeriode, setSelectedPeriode] = useState<"semaine" | "mois" | "annee">("annee");

  const [recoltesCumulees, setRecoltesCumulees] = useState<{ nom: string; img: string; poids: number }[]>([]);

  const [cultures, setCultures] = useState<{ id: string; nom: string; img: string; mode_recolte: string }[]>([]);
  const [selectedCultureId, setSelectedCultureId] = useState("");
  const selectedCulture = cultures.find((c) => c.id === selectedCultureId);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch(`/api/recoltes/cumuls?limit=5&periode=${selectedPeriode}`)
      .then((res) => res.json())
      .then((data) => {
        const top5 = data
          .filter((item: any) => item?.culture?.nom && item?.culture?.img)
          .sort((a: any, b: any) => b.poids - a.poids)
          .slice(0, 5)
          .map((item: any) => ({
            nom: item.culture.nom,
            img: item.culture.img,
            poids: item.poids,
          }));
        setRecoltesCumulees(top5);
      });
  }, [selectedPeriode]);

  useEffect(() => {
    fetch("/api/cultures")
      .then((res) => res.json())
      .then((data) => {
        setCultures(data);
        if (data.length > 0) setSelectedCultureId(data[0].id);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-base)] text-[var(--color-text)] p-4 space-y-2 font-sans">

      {/* 🌱 Zone 1 - Tableau synthèse */}
      <div className="rounded-xl border p-4 bg-[var(--color-fill)]">
        <div className="flex gap-2 mb-2 w-full">
          {["annee", "mois", "semaine"].map((periode) => (
            <button
              key={periode}
              onClick={() => setSelectedPeriode(periode as "semaine" | "mois" | "annee")}
              className={`flex-1 text-center px-3 py-1 rounded-full text-xs font-semibold ${
                selectedPeriode === periode
                  ? "bg-[var(--color-accent)] text-[var(--color-base)]"
                  : "bg-[var(--color-muted)] text-[var(--color-text)]"
              }`}
            >
              {periode[0].toUpperCase() + periode.slice(1)}
            </button>
          ))}
        </div>
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left">
              <th className="cursor-pointer">Nom</th>
              <th className="cursor-pointer">Poids cumulés</th>
            </tr>
          </thead>
          <tbody>
            {recoltesCumulees.map((item, index) => (
              <tr key={index} className="bg-[var(--color-card)] rounded-md">
                <td className="p-2">
                  <img
                    src={`/images/cultures/${item.img}`}
                    alt={item.nom}
                    className="mr-2 inline-block w-8 h-8 object-contain"
                  />
                  {item.nom}
                </td> 
                <td className="p-2 font-medium">{(item.poids / 1000).toFixed(2)} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ Zone 2 - Ajout récolte (dynamique) */}
      <div className="rounded-xl border p-4 bg-[var(--color-fill)] flex flex-col items-center justify-center gap-4">
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
          {selectedCulture && (
            <div className="flex items-center gap-2">
              <img
                src={`/images/cultures/${selectedCulture.img}`}
                alt={selectedCulture.nom}
                className="w-16 h-16 object-contain"
              />
              <span className="text-lg font-semibold">{selectedCulture.nom}</span>
            </div>
          )}
          <select
            name="culture"
            value={selectedCultureId}
            onChange={(e) => setSelectedCultureId(e.target.value)}
            className="px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] font-sans"
          >
            {cultures.map((culture) => (
              <option
                key={culture.id}
                value={culture.id}
                dangerouslySetInnerHTML={{
                  __html: `<img src="/images/cultures/${culture.img}" width="20" height="20" style="vertical-align:middle; margin-right:4px;" /> ${culture.nom}`,
                }}
              />
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
      </div>

      {/* 🎨 Zone 3 - Thèmes + Mode */}
      <div className="rounded-xl border p-4 bg-[var(--color-fill)] flex items-center justify-center gap-8">
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