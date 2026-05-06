import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        instrument: ["Instrument Serif", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        codenest: {
          bg: "#070b0a",
          accent: "#5ed29c",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
