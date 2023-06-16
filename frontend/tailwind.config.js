/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        charm: "   'Charm', cursive ",
        lora: " 'Lora', serif ",
        Montserrat: " 'Montserrat', sans-serif ",
      },
    },
  },
  plugins: [],
};
