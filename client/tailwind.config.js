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

  plugins: [require("tailwind-scrollbar")],
};
