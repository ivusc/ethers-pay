/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        chivo: ['Chivo Mono', 'sans-serif'],
        gothic: ['Didact Gothic', 'sans-serif']
      }
    },
  },
  plugins: [],
}
