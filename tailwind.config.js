module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "red",
      secondary: "skyblue",
      gray: {
        100: "#f5f5f5",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      blue: {
        100: "#f4f9ff",
        200: "#cee2ff",
        300: "#154b9b",
        400: "#97b2dd",
        500: "#4299e1",
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#97b2dd",
        1000: "#346BAC",
      },
      red: {
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      green: {
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
      },
      white: "#ffffff",
      black: "#000000",
    },
    extend: {},
  },
  plugins: [],
};
