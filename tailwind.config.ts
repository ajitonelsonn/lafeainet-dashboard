// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "ping-slow": {
          "0%": { opacity: "0", transform: "scale(0.1)" },
          "50%": { opacity: "0.3" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        "ping-medium": {
          "0%": { opacity: "0", transform: "scale(0.1)" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        "ping-fast": {
          "0%": { opacity: "0", transform: "scale(0.1)" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
      },
      animation: {
        "ping-slow": "ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-medium": "ping-medium 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-fast": "ping-fast 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
