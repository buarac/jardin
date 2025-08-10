"use client";

import React from "react";
import { MobileThemeState } from "@/types/mobile";

interface MobileThemeToggleProps {
  themeState: MobileThemeState;
  onThemeChange: (theme: "soleil" | "lavande") => void;
  onDarkModeChange: (isDark: boolean) => void;
}

export const MobileThemeToggle: React.FC<MobileThemeToggleProps> = ({
  themeState,
  onThemeChange,
  onDarkModeChange,
}) => {
  return (
    <div className="rounded-xl border p-4 bg-[var(--color-fill)] flex items-center justify-center gap-8">
      {/* Switch Mode Clair/Sombre */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Clair</span>
        <button
          className="relative w-14 h-8 bg-gray-300 dark:bg-zinc-700 rounded-full transition-colors duration-300"
          onClick={() => onDarkModeChange(!themeState.isDarkMode)}
        >
          <div
            className={`absolute top-0.5 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
              themeState.isDarkMode 
                ? "left-6 bg-black text-white" 
                : "left-0.5 bg-white text-yellow-500"
            }`}
          >
            {themeState.isDarkMode ? "🌙" : "☀️"}
          </div>
        </button>
        <span className="text-sm">Sombre</span>
      </div>

      {/* Switch Thème */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Soleil</span>
        <button
          className="relative w-14 h-8 rounded-full transition-colors duration-300 bg-[var(--color-accent)]"
          onClick={() => onThemeChange(themeState.theme === "soleil" ? "lavande" : "soleil")}
        >
          <div
            className={`absolute top-0.5 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
              themeState.theme === "soleil"
                ? "left-0.5 bg-white text-yellow-500"
                : "left-6 bg-white text-indigo-300"
            }`}
          >
            {themeState.theme === "soleil" ? "🌞" : "🌿"}
          </div>
        </button>
        <span className="text-sm">Lavande</span>
      </div>
    </div>
  );
};
