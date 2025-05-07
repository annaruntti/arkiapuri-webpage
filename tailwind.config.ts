import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-fira-sans)"],
      },
      colors: {
        primary: {
          DEFAULT: "#9C86FC",
          dark: "#7B6BC9",
          light: "#B5A4FD",
        },
        secondary: {
          DEFAULT: "#38E4D9",
          dark: "#38E4D9",
          light: "#38E4D9",
        },
        tertiary: {
          DEFAULT: "#FBD932",
          dark: "#FBD932",
          light: "#FBD932",
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
