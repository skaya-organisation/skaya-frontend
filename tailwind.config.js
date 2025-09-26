// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.{md,mdx,ts,tsx,js,jsx}",
    "./src/docs/components/**/*.{ts,tsx,jsx,js}",
  ],
  darkMode: "class",
  safelist: [],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
};
