import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#F43F5E",  // rose-500
          dark:    "#E11D48",  // rose-600
        },
        ink: {
          DEFAULT: "#0A0A0F",
          soft:    "#16161E",
          muted:   "#1E1E2A",
        },
        paper: {
          DEFAULT: "#ffffff",
          soft:    "#f1f1f1",
          muted:   "#DEDED6",
        },
      },
      animation: {
        "blink":     "blink 1s step-end infinite",
        "float":     "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;