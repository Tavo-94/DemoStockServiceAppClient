const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        bymaBgFooter: "#333",
        bymaAccent: "#172953",
        accent: "#f97316",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

