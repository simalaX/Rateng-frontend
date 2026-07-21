/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      // ========== EXISTING COLORS (KEEP AS IS) ==========
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

      // ========== EXISTING FONTS + LUXURY SERIF ==========
      fontFamily: {
        heading: ["'Fraunces'", "serif"],           // Keep existing
        body: ["'Inter'", "sans-serif"],            // Keep existing
        mono: ["'IBM Plex Mono'", "monospace"],     // Keep existing
        serif: ["'Playfair Display'", "Georgia", "serif"],  // NEW: Luxury serif
      },

      // ========== LUXURY: LETTER SPACING ==========
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0em",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.1em",
        premium: "0.15em",     // NEW: For buttons
        ultra: "0.2em",        // NEW: For headings
      },

      // ========== LUXURY: ADDITIONAL SPACING ==========
      spacing: {
        28: "7rem",   // NEW: 112px
        32: "8rem",   // NEW: 128px
        36: "9rem",   // NEW: 144px
        40: "10rem",  // NEW: 160px
        48: "12rem",  // NEW: 192px
      },

      // ========== LUXURY: REFINED BORDER RADIUS ==========
      borderRadius: {
        xs: "2px",    // NEW: Extra small (minimal)
        sm: "2px",    // NEW: Small (minimal)
        // base, md, lg use Tailwind defaults
      },

      // ========== LUXURY: BORDER WIDTH ==========
      borderWidth: {
        "0.5": "0.5px",  // NEW: Hairline borders
      },

      // ========== LUXURY: TRANSITION DURATIONS ==========
      transitionDuration: {
        250: "250ms",  // NEW: Quick transitions
        350: "350ms",  // NEW: Smooth transitions
        400: "400ms",  // NEW: Deliberate transitions
      },

      // ========== LUXURY: PREMIUM SHADOWS ==========
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.08)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        premium: "0 2px 8px rgba(0, 0, 0, 0.06)",  // NEW: Subtle luxury shadow
      },

      // ========== KEYFRAMES & ANIMATIONS ==========
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "carousel": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "15%": { opacity: "1", transform: "translateX(0)" },
          "85%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.9s ease-out both",
        "scroll": "scroll 10s linear infinite",
        "carousel": "carousel 24s linear infinite",
      },
    },
  },
  plugins: [],
};