/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // dispositivos extra pequenos (480px para baixo)
        xs: { max: "480px" },

        // dispositivos pequenos (481px até 767px)
        sm: "481px",

        // dispositivos médios (768px até 991px)
        md: "768px",

        // dispositivos grandes (992px até 1299px)
        lg: "992px",

        // dispositivos extra-grandes (1300px para cima)
        xl: "1300px",
      },
    },
  },
  plugins: [],
};
