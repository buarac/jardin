"use client"
import { useEffect, useState, useRef } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

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
    <div className="min-h-screen bg-neutral-700 text-neutral-300 p-16">
      <ToggleGroup
        type="single"
        value={selectedPeriode}
        onValueChange={(value) => value && setSelectedPeriode(value)}
        className="flex justify-center gap-6 mb-12 w-full max-w-screen-xl mx-auto"
        ref={toggleRef}
      >
        <ToggleGroupItem
          value="annee"
          tabIndex={0}
          className="text-3xl py-6 data-[state=on]:bg-red-400 data-[state=on]:text-white"
        >
          Année
        </ToggleGroupItem>
        <ToggleGroupItem
          value="mois"
          tabIndex={0}
          className="text-3xl py-6 data-[state=on]:bg-red-400 data-[state=on]:text-white"
        >
          Mois
        </ToggleGroupItem>
        <ToggleGroupItem
          value="semaine"
          tabIndex={0}
          className="text-3xl py-6 data-[state=on]:bg-red-400 data-[state=on]:text-white"
        >
          Semaine
        </ToggleGroupItem>
        <ToggleGroupItem
          value="jour"
          tabIndex={0}
          className="text-3xl py-6 data-[state=on]:bg-red-400 data-[state=on]:text-white"
        >
          Jour
        </ToggleGroupItem>
      </ToggleGroup>
      <div className={`grid ${recoltesCumulees.length <= 8 ? "grid-cols-2" : "grid-cols-4"} gap-8`}>
        {recoltesCumulees.map((item, index) => (
          <div
            key={index}
            className="bg-neutral-200 rounded-2xl p-4 flex items-center space-x-8 shadow-lg"
          >
            <img
              src={`/images/cultures/${item.img}`}
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
