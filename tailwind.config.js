/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./about/**/*.html",
    "./trips/**/*.html",
    "./tools/**/*.html",
    "./journal/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DotGothic16"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#4f46e5", // indigo-600
        accent: "#ec4899", // pink-500
        surface: "#f9fafb", // gray-50
        subtle: "#9ca3af", // gray-400
      },
    },
  },
  plugins: [],
};
