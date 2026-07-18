/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#10161B",
          light: "#1A232B",
          lighter: "#232F38",
        },
        bronze: {
          DEFAULT: "#AD8348",
          light: "#C9A878",
          dark: "#8A6533",
        },
        slate: {
          DEFAULT: "#3C5468",
          light: "#5D7891",
          dark: "#2A3C4B",
        },
        plaster: "#EDE6D8",
        paper: "#F7F4EE",
      },
      fontFamily: {
        heading: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};
