/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#fdf6e3',
        'ink': '#3a2d21',
        'wood': '#4f3f31',
        'gold': '#d4af37',
        'compass-bg': '#c5b7a3',
      },
      fontFamily: { 
        'display': ['Cinzel', 'serif'],
        'body': ['Poppins', 'sans-serif'] }
    },
  },
  plugins: [],
}