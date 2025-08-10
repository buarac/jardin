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
  // Toujours afficher la structure du tableau pour maintenir la hauteur constante
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
          {loading ? (
            <tr>
              <td colSpan={2} className="text-center py-8">
                <div className="text-lg text-[var(--color-accent)]">
                  🔄 Chargement des données...
                </div>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={2} className="text-center py-8">
                <div className="text-lg text-red-500">❌ Erreur: {error}</div>
              </td>
            </tr>
          ) : recoltes.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-8">
                <div className="text-lg text-[var(--color-text)]">
                  📭 Aucune récolte trouvée pour cette période
                </div>
              </td>
            </tr>
          ) : (
            recoltes.map((item, index) => (
              <tr
                key={`${item.nom}-${index}`}
                className="bg-[var(--color-card)] rounded-md"
              >
                <td className="p-2">
                  <div className="inline-flex items-center justify-start gap-3">
                    <img
                      src={`/images/cultures/${item.img}`}
                      alt={item.nom}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <span className="text-sm font-medium">{item.nom}</span>
                  </div>
                </td>
                <td className="p-2 font-medium">
                  {(item.poids / 1000).toFixed(2)} kg
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
