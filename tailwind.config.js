/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gradientOrange: '#FF3F00',
        gradientPurple: '#6D0C55',
        gradientRed: '#E0001E',
        background: '#161412',
      }
    },
  },
  plugins: [],
}

