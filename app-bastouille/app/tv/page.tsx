"use client"
import { useEffect, useState } from "react";

interface Culture {
  nom: string;
  img: string;
  poids: number;
}

export default function TVJobsPage() {
  const [recoltesCumulees, setRecoltesCumulees] = useState<Culture[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/recoltes/synthese?periode=annee&limit=6`)
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

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-scree bg-neutral-700 text-neutral-300 p-16">
      <h1 className="text-6xl font-bold mb-12 text-center">
        Cumuls des récoltes (année en cours)
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {recoltesCumulees.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--color-card)] rounded-2xl p-8 flex items-center space-x-8 shadow-lg"
          >
            <img
              src={`/images/cultures/${item.img}`}
              alt={item.nom}
              className="w-48 h-48 object-contain"
            />
            <div className="text-neutral-700">
              <h2 className="text-6xl font-semibold">{item.nom}</h2>
              <p className="text-8xl mt-2">{(item.poids / 1000).toFixed(2)} kg</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
