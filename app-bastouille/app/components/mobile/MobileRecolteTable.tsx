"use client";

import React from "react";
import { MobileRecolteData } from "@/types/mobile";

interface MobileRecolteTableProps {
  recoltes: MobileRecolteData[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export const MobileRecolteTable: React.FC<MobileRecolteTableProps> = ({
  recoltes,
  loading = false,
  error = null,
  className = "",
}) => {
  if (loading) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-lg text-[var(--color-accent)]">
          🔄 Chargement des données...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-lg text-red-500">
          ❌ Erreur: {error}
        </div>
      </div>
    );
  }

  if (recoltes.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-lg text-[var(--color-text)]">
          📭 Aucune récolte trouvée pour cette période
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <table className="w-full text-sm border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left">
            <th className="cursor-pointer font-medium text-[var(--color-text)]">
              Nom
            </th>
            <th className="cursor-pointer font-medium text-[var(--color-text)]">
              Poids cumulés
            </th>
          </tr>
        </thead>
        <tbody>
          {recoltes.map((item, index) => (
            <tr key={`${item.nom}-${index}`} className="bg-[var(--color-card)] rounded-md">
              <td className="p-2">
                <div className="inline-flex items-center justify-start gap-3">
                  <img
                    src={`/images/cultures/${item.img}`}
                    alt={item.nom}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <span className="text-sm font-medium">{item.nom}</span>
                </div>
              </td>
              <td className="p-2 font-medium">
                {(item.poids / 1000).toFixed(2)} kg
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
