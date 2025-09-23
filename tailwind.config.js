/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./docs/**/*.{md,mdx,ts,tsx,js,jsx}",
  "./src/components/**/*.{ts,tsx,jsx,js}",
],
  safelist: [
    'bg-blue-600',
    'bg-green-600',
    'hover:bg-blue-700',
    'hover:bg-green-700',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
};
