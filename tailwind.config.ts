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
        cream: "var(--cream)",
        ink: "var(--ink)",
        berry: "var(--berry)",
        leaf: "var(--leaf)",
        malt: "var(--malt)",
        gold: "var(--gold)",
        cocoa: "var(--cocoa)",
        copper: "var(--copper)",
        vanilla: "var(--vanilla)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-nunito-sans)", "sans-serif"],
      },
      letterSpacing: {
        smallcaps: "0.12em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(42, 37, 33, 0.04), 0 4px 8px rgba(42, 37, 33, 0.04), 0 16px 32px rgba(42, 37, 33, 0.06)",
        lifted: "0 2px 4px rgba(42, 37, 33, 0.06), 0 8px 16px rgba(42, 37, 33, 0.06), 0 24px 48px rgba(42, 37, 33, 0.09)",
        glow: "0 0 24px -4px var(--accent-glow, rgba(226, 96, 107, 0.25))",
      },
    },
  },
  plugins: [],
};

export default config;
