"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * ThemeSwitcher renders two select fields allowing the user to choose the
 * currently active visual theme and colour mode. It is used on the
 * Paramétrage screen.
 */
export const ThemeSwitcher: React.FC = () => {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center gap-4">
        <label htmlFor="theme-select" className="font-medium">
          Thème
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as any)}
          className="p-2 rounded-md bg-skin-fill text-skin-text border border-skin-muted"
        >
          <option value="soleil">Soleil du Sud</option>
          <option value="lavande">Lavande et Romarin</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="mode-select" className="font-medium">
          Mode
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
          className="p-2 rounded-md bg-skin-fill text-skin-text border border-skin-muted"
        >
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
          <option value="system">Système</option>
        </select>
      </div>
    </div>
  );
};
