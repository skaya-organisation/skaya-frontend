/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./docs/**/*.{md,mdx,ts,tsx,js,jsx}",
  "./src/components/**/*.{ts,tsx,jsx,js}",
],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
};
