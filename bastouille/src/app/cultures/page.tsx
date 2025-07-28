"use client";

import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { fetchCultures } from "@/lib/api";

export default function CulturePage() {
  const [cultures, setCultures] = useState([]);

  useEffect(() => {
    const loadCultures = async () => {
      const data = await fetchCultures();
      setCultures(data);
    };
    loadCultures();
  }, []);

  return (
    <AppLayout title="Cultures" version="v1.0.0" showBack={true}>
      <div className="flex flex-col h-[100dvh]">
        <div className="flex-1 overflow-y-auto px-2 pt-16 pb-20">
          <ul className="space-y-2">
            {cultures.map((culture) => (
              <li key={culture.id} className="flex items-center gap-4 bg-green-100 p-3 rounded shadow">
                <img
                  src={`/cultures/${culture.img.replace(".png", "")}.png`}
                  alt={culture.nom}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-semibold">{culture.nom}</p>
                  <p className="text-sm text-gray-600">{culture.categorie}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}