import type { Config } from "tailwindcss";

/**
 * Tailwind configuration for the Baštouille application.  The colour palette
 * extends the default Tailwind theme with the project's identity colours
 * (kaki and gold).  This file tells Tailwind where to look for class names
 * (the src directory) and enables dark mode via class switching.
 */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kaki colour used for primary accents and backgrounds
        kaki: {
          DEFAULT: "#78866B",
          light: "#9fae83",
          dark: "#545d49",
        },
        // Gold colour used for highlights, buttons and interactive elements
        gold: {
          DEFAULT: "#D4AF37",
          light: "#e6c85d",
          dark: "#af8e2f",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;