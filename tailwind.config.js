// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./src/docs/components/**/*.{ts,tsx,jsx,js}",
  ],
  darkMode: "class",
  safelist: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
