"use client"
import React, { useState, useEffect } from "react";
import CultureSelector from "@/components/CultureSelector";
import RecipientSelector from "@/components/RecipientSelector";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function MobilePage() {
  // const [isDarkMode, setIsDarkMode] = useState(true);
  // const [theme, setTheme] = useState<"soleil" | "lavande">("lavande");
  const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
  }, []);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<"soleil" | "lavande">("soleil");

  const [selectedPeriode, setSelectedPeriode] = useState<"semaine" | "mois" | "annee">("annee");

  const [recoltesCumulees, setRecoltesCumulees] = useState<{ nom: string; img: string; poids: number }[]>([]);

  const [cultures, setCultures] = useState<{ id: string; nom: string; img: string; mode_recolte: string }[]>([]);
  const [selectedCultureId, setSelectedCultureId] = useState("");
  const selectedCulture = cultures.find((c) => c.id === selectedCultureId);

  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);

  // Recipients state and fetch
  const [recipients, setRecipients] = useState<{ id: string; nom: string; poids: number }[]>([]);

  const [openZone, setOpenZone] = useState<1 | 2 | null>(2);

  useEffect(() => {
    fetch("/api/recipients")
      .then((res) => res.json())
      .then((data) => setRecipients(data));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch(`/api/recoltes/synthese?limit=7&periode=${selectedPeriode}`)
      .then((res) => res.json())
      .then((data) => {
        const cumuls = data
          .filter((item: any) => item?.culture?.nom && item?.culture?.img)
          .map((item: any) => ({
            nom: item.culture.nom,
            img: item.culture.img,
            poids: item.poids,
          }));
        setRecoltesCumulees(cumuls);
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

  if (!isMounted) return null;
  return (
    <div className="min-h-screen bg-[var(--color-base)] text-[var(--color-text)] p-4 space-y-2 font-sans">

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

      {/* 🌱 Zone 1 - Tableau synthèse */}
      <div className="rounded-xl border bg-[var(--color-fill)]">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setOpenZone(openZone === 1 ? null : 1)}
        >
          <h2 className="text-lg font-semibold">🌱 Synthèse des récoltes</h2>
          {openZone === 1 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {openZone === 1 && (
          <div className="p-4 pt-0">
            <div className="flex gap-2 mb-2 w-full">
              {["annee", "mois", "semaine"].map((periode) => (
                <button
                  key={periode}
                  onClick={() => setSelectedPeriode(periode as "semaine" | "mois" | "annee")}
                  className={`flex-1 text-center px-3 py-2 rounded-full text-xs font-semibold ${
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
        )}
      </div>

      {/* ➕ Zone 2 - Ajout récolte (dynamique) */}
      <div className="rounded-xl border bg-[var(--color-fill)]">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setOpenZone(openZone === 2 ? null : 2)}
        >
          <h2 className="text-lg font-semibold">🧺 Nouvelle récolte</h2>
          {openZone === 2 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {openZone === 2 && (
          <div className="p-4 pt-0">
            <div className="p-4 pt-2 flex flex-col items-center justify-center gap-4">
              <form
                className="flex flex-col gap-2 w-full max-w-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const poids = formData.get("poids")?.toString() ?? "";
                  const quantite = formData.get("quantite")?.toString() ?? "";
                  const recipient = recipients.find((r) => r.id === selectedRecipientId);
                  const poidsBrut = parseFloat(poids);
                  const poidsNet = recipient ? Math.max(0, poidsBrut - recipient.poids) : poidsBrut;
                  const now = new Date();
                  now.setHours(11, 0, 0, 0);

                  fetch("/api/recoltes", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id_culture: selectedCulture?.id,
                      date: now.toISOString(),
                      poids: poidsNet,
                      quantite: 0,
                      quantite_fiable: false,
                      recipient_id: recipient?.id ?? null,
                    }),
                  })
                    .then(async (res) => {
                      if (!res.ok) {
                        const error = await res.text();
                        throw new Error(error);
                      }
                      alert("✅ Récolte enregistrée avec succès !");
                    })
                    .catch((err) => {
                      console.error(err);
                      alert("❌ Erreur lors de l'enregistrement de la récolte.");
                    });
                  form.reset();
                }}
              >
                <div className="flex pd-2 w-full max-w-sm rounded bg-[var(--color-card)] text-[var(--color-text)]">
                  <CultureSelector
                    value={selectedCultureId}
                    onChange={setSelectedCultureId}
                  />
                </div>

                <div className="flex gap-2 w-full max-w-sm">
                  <input
                    name="poids"
                    type="number"
                    step="1"
                    placeholder="Poids (g)"
                    className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
                    required
                  />
                  <input
                    name="quantite"
                    type="number"
                    placeholder="Unités"
                    className="flex-1 px-4 py-2 rounded bg-[var(--color-card)] text-[var(--color-text)] w-1/2"
                    disabled={selectedCulture?.mode_recolte !== "poids_unite"}
                  />
                </div>

                <div className="flex pd-2 w-full max-w-sm rounded bg-[var(--color-card)] text-[var(--color-text)]">
                  <RecipientSelector
                    value={selectedRecipientId}
                    onChange={setSelectedRecipientId}
                  />
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
                  '+ Ajouter la récolte
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}