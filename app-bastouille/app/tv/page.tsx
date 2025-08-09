"use client"
import { useEffect, useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import SplashScreen from "@/components/SplashScreen";

interface Culture {
  nom: string;
  img: string;
  poids: number;
}

export default function TVJobsPage() {
  const [recoltesCumulees, setRecoltesCumulees] = useState<Culture[]>([]);
  const [selectedPeriode, setSelectedPeriode] = useState("annee");

  const fetchData = () => {
    fetch(`/api/recoltes/synthese?periode=${selectedPeriode}&limit=12`)
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
    fetchData();
  }, [selectedPeriode]);

  useEffect(() => {
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [selectedPeriode]);

  return (
    <>
      <SplashScreen />
    <div className="min-h-screen p-16">
      <ToggleGroup
        type="single"
        value={selectedPeriode}
        onValueChange={(value) => value && setSelectedPeriode(value)}
        className="flex justify-center gap-6 mb-12 w-full max-w-screen-xl mx-auto text-[var(--color-accent)]"
      >
        <ToggleGroupItem
          value="annee"
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Année
        </ToggleGroupItem>
        <ToggleGroupItem
          value="mois"
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Mois
        </ToggleGroupItem>
        <ToggleGroupItem
          value="semaine"
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Semaine
        </ToggleGroupItem>
        <ToggleGroupItem
          value="jour"
          className="text-5xl py-8 px-8 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-fill)]"
        >
          Jour
        </ToggleGroupItem>
      </ToggleGroup>
      {/*<div className={`grid ${recoltesCumulees.length <= 8 ? "grid-cols-2" : "grid-cols-4"} gap-8`} tabIndex={0}>*/}
      <div className={`grid grid-cols-4 gap-8`}>
        {recoltesCumulees.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--color-card)] rounded-2xl p-4 flex items-center space-x-8 shadow-lg transition-transform duration-200 hover:scale-105"
          >
            <img
              src={`/images/cultures/hd/${item.img}`}
              alt={item.nom}
              className="w-40 h-40 object-contain"
            />
            <div className="text-[var(--color-text)]">
              <h2 className="text-3xl font-semibold">{item.nom}</h2>
              <p className="text-4xl font-bold mt-2">{(item.poids / 1000).toFixed(2)} kg</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
