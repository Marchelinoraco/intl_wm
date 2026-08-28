import type { Config } from "tailwindcss";

/**
 * Palet lewat token semantik (CSS var di globals.css) supaya light & dark mode
 * pakai kelas yang sama. Nilai light dipatok persis ke warna slate lama
 * (canvas=white, ink=slate-900, dst.) — light mode tidak berubah sedikit pun.
 * Aksen tetap red-600 (light) / red-500 (dark).
 */
const token = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: token("--canvas"),
        surface: token("--surface"),
        "surface-2": token("--surface-2"),
        line: token("--line"),
        ink: token("--ink"),
        "ink-2": token("--ink-2"),
        "ink-3": token("--ink-3"),
        accent: token("--accent"),
      },
      keyframes: {
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "menu-in": {
          from: { opacity: "0", transform: "translateY(-6px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "menu-in": "menu-in 0.16s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
