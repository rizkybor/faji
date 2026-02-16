import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        faji: {
          blue: {
            DEFAULT: "#355C9A",
            50: "#EAF0F8",
            100: "#D5E1F1",
            200: "#ABC3E3",
            300: "#81A5D5",
            400: "#5787C7",
            500: "#355C9A", // Main
            600: "#2A4A7B",
            700: "#1F375C",
            800: "#15253D",
            900: "#0A121F",
          },
          green: {
            DEFAULT: "#5BB881",
            50: "#EEF8F2",
            100: "#DDF1E5",
            200: "#BCE3CC",
            300: "#9BD5B3",
            400: "#7AC79A",
            500: "#5BB881", // Main
            600: "#499367",
            700: "#376E4D",
            800: "#244933",
            900: "#12251A",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/rafting-hero.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
