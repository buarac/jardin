"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Theme names supported by the application. They correspond to the visual
 * identities defined in `globals.css`. If you add new themes you must
 * supply matching CSS variable definitions.
 */
export type ThemeName = "soleil" | "lavande";

/**
 * Mode can be light or dark or follow the system preference. When in
 * system mode we read the `prefers-color-scheme` media query on the client.
 */
export type ColorMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeName;
  mode: ColorMode;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider is a client component that persists the chosen theme and mode
 * to localStorage. It also updates data attributes on the html element so
 * CSS variables defined in `globals.css` take effect.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>("soleil");
  const [mode, setModeState] = useState<ColorMode>("light");

  // On mount, read previously stored preferences. Because this runs in a
  // `useEffect` the code only executes on the client which avoids hydration
  // mismatches with Next.js server rendering.
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeName | null;
    const storedMode = localStorage.getItem("mode") as ColorMode | null;
    if (storedTheme) setThemeState(storedTheme);
    if (storedMode) setModeState(storedMode);
  }, []);

  // Whenever theme or mode changes we update localStorage and the DOM
  // attributes. System mode derives its current value from the media query.
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
    document.documentElement.setAttribute("data-theme", theme);
    if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-mode", isDark ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-mode", mode);
    }
  }, [theme, mode]);

  const setTheme = (t: ThemeName) => setThemeState(t);
  const setMode = (m: ColorMode) => setModeState(m);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}