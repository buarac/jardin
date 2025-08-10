"use client";

import React from "react";
import { MobilePeriod } from "@/types/mobile";

interface MobilePeriodSelectorProps {
  selectedPeriod: MobilePeriod;
  onPeriodChange: (period: MobilePeriod) => void;
  periods?: MobilePeriod[];
  className?: string;
}

export const MobilePeriodSelector: React.FC<MobilePeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  periods = ["annee", "mois", "semaine"],
  className = "",
}) => {
  const getPeriodLabel = (period: MobilePeriod): string => {
    return period[0].toUpperCase() + period.slice(1);
  };

  return (
    <div className={`flex gap-2 mb-2 w-full ${className}`}>
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onPeriodChange(period)}
          className={`flex-1 text-center px-3 py-2 rounded-full text-xs font-semibold transition-colors duration-200 ${
            selectedPeriod === period
              ? "bg-[var(--color-accent)] text-[var(--color-base)]"
              : "bg-[var(--color-muted)] text-[var(--color-text)] hover:bg-[var(--color-card)]"
          }`}
        >
          {getPeriodLabel(period)}
        </button>
      ))}
    </div>
  );
};
