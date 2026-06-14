import type { Config } from "tailwindcss";

/**
 * Tailwind 3.4. The visual system is driven primarily by the CSS custom
 * properties in app/globals.css (ported 1:1 from the approved Phase-3 mock).
 * This config mirrors those tokens so any Tailwind utility used for layout
 * stays in lockstep with the design system.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF9",
        "paper-tint": "#F4F2EE",
        ink: "#1C1917",
        "ink-deep": "#0C0A09",
        graphite: "#44403C",
        muted: "#57534E",
        hairline: "#E7E5E4",
        "hairline-2": "#D6D3D1",
        accent: "#CA8A04",
        "accent-ink": "#92580A",
        "accent-lift": "#E3B341",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "Times New Roman", "serif"],
        sans: [
          "var(--font-libre-franklin)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1120px",
        measure: "680px",
      },
    },
  },
  plugins: [],
};

export default config;
