/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        backgroundColor: "#fafaf6",
        secondColor: "#e3e3e3",
        textColor: "#212121",
        primeColor: "#9A6AFF",
        primeColorHover: "#7848DD",
        thirdColor: "#c1c1c1",
        thirdColorHover: "#a0a0a0",
      },
    },
  },
  plugins: [],
};
