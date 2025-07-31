/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        skin: {
          base: 'var(--color-base)',
          fill: 'var(--color-fill)',
          text: 'var(--color-text)',
          accent: 'var(--color-accent)',
          muted: 'var(--color-muted)',
          card: 'var(--color-card)'
        }
      }
    }
  },
  plugins: []
};