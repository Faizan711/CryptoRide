/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Cabin", "sans-serif"],
      readex: ["Readex Pro", "sans-serif"],
      bruno: ["Bruno Ace SC", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
