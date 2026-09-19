import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        khmer: ["var(--font-khmer)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;