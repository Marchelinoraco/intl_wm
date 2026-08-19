import type { Config } from "tailwindcss";

// Palet mengikuti client_wm: aksen red-600, netral slate.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
};

export default config;
