// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#22c55e', // Green color for environmental theme
        'secondary': '#0ea5e9',
      },
    },
  },
  plugins: [],
}