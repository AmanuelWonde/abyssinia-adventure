/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkbrown: "#4E342E",
        coolviolet: "#1C1617",
        coolgray: "#546E7A",
      },
      breakInside: {
        avoid: "avoid",
        "avoid-column": "avoid-column",
        "avoid-page": "avoid-page",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      gradientColorStops: (theme) => ({
        ...theme("colors"),
        primary: "#4E342E", // Dark brown
        secondary: "#1C1617", // Violet
        tertiary: "#546E7A", // Gray
      }),
    },
  },
  variants: {
    extend: {
      // Enabling breakInside utilities for responsive design if needed
      breakInside: ["responsive"],
    },
  },

  plugins: [
    require("tailwind-scrollbar"),
    function ({ addUtilities }) {
      addUtilities({
        ".break-inside-auto": { breakInside: "auto" },
        ".break-inside-avoid": { breakInside: "avoid" },
        ".break-inside-avoid-page": { breakInside: "avoid-page" },
        ".break-inside-avoid-column": { breakInside: "avoid-column" },
      });
    },
  ],
};
