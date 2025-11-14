module.exports = {
  content: [
    "./index.html",
    "./main.jsx",
    "./App.jsx",
    "./src/**/*.{js,jsx}",
    "./Pages/**/*.{js,jsx}",
    "./Components/**/*.{js,jsx}",
    "./Layout.jsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff0035",
        dark: "#0e131f",
        gray: {
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
