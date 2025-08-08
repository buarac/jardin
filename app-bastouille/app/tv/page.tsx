"use client"
import { useEffect, useState, useRef } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import Script from "next/script";

interface Culture {
  nom: string;
  img: string;
  poids: number;
}

export default function TVJobsPage() {
  const [recoltesCumulees, setRecoltesCumulees] = useState<Culture[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState("annee");
  const toggleRef = useRef<HTMLDivElement>(null);

  const fetchData = () => {
    fetch(`/api/recoltes/synthese?periode=${selectedPeriode}&limit=40`)
      .then((res) => res.json())
      .then((data) => {
        const result = data
          .filter((item: any) => item?.culture?.nom && item?.culture?.img)
          .map((item: any) => ({
            nom: item.culture.nom,
            img: item.culture.img,
            poids: item.poids,
          }));
        setRecoltesCumulees(result);
      });
  };

  useEffect(() => {
    const tryRegister = () => {
      const domEl = toggleRef.current;

      // Encore trop tôt ? On réessaie dans 100ms
      if (!domEl || !window.App?.Navigation) {
        console.warn("⏳ En attente de window.App.Navigation...");
        setTimeout(tryRegister, 100); // pas de return ici, on attend juste
        return;
      }

      // ✅ On est prêt
      window.App.Navigation.registerMenu({
        name: "periode",
        domEl,
        alignment: "horizontal",
        selectionVisible: true,
        onActiveItemChanged: (el: HTMLElement | null) => {
          el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        },
        onKeyEnter: () => {
          const items = toggleRef.current?.querySelectorAll('[data-list-item]');
          const index = window.App.Navigation.getMenu("periode").getFocusedElemIdx();
          const item = items?.[index] as HTMLElement;
          item?.click();
        },
      });

      window.App.Navigation.changeActiveMenu("periode");

      console.log("✅ Menu 'periode' enregistré");
    };

    tryRegister();

    return () => {
      if (window.App?.Navigation) {
        window.App.Navigation.unregisterMenu("periode");
      } else {
        console.warn("⚠️ Navigation non disponible lors du cleanup");
      }
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedPeriode]);

  useEffect(() => {
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [selectedPeriode]);

  useEffect(() => {
    const selected = toggleRef.current?.querySelector('[data-state="on"]') as HTMLElement | null;
    selected?.focus();
  }, [selectedPeriode]);

  return (

    <div className="min-h-screen p-16">
      <Script
        src="/navigation.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("✅ Script navigation.js chargé")}
      />
      <ToggleGroup
        type="single"
        value={selectedPeriode}
        onValueChange={(value) => value && setSelectedPeriode(value)}
        className="flex justify-center gap-6 mb-12 w-full max-w-screen-xl mx-auto text-[var(--color-accent)]"
        ref={toggleRef}
      >
        <ToggleGroupItem
          data-list-item
          value="annee"
          tabIndex={0}
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Année
        </ToggleGroupItem>
        <ToggleGroupItem
          data-list-item
          value="mois"
          tabIndex={0}
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Mois
        </ToggleGroupItem>
        <ToggleGroupItem
          data-list-item
          value="semaine"
          tabIndex={0}
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Semaine
        </ToggleGroupItem>
        <ToggleGroupItem
          data-list-item
          value="jour"
          tabIndex={0}
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Jour
        </ToggleGroupItem>
      </ToggleGroup>
      <div className={`grid ${recoltesCumulees.length <= 8 ? "grid-cols-2" : "grid-cols-4"} gap-8`} tabIndex={0}>
        {recoltesCumulees.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--color-text)] rounded-2xl p-4 flex items-center space-x-8 shadow-lg transition-transform duration-200 hover:scale-105"
          >
            <img
              src={`/images/cultures/hd/${item.img}`}
              alt={item.nom}
              className="w-32 h-32 object-contain"
            />
            <div className="text-neutral-700">
              <h2 className="text-3xl font-semibold">{item.nom}</h2>
              <p className="text-4xl font-bold mt-2">{(item.poids / 1000).toFixed(2)} kg</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

