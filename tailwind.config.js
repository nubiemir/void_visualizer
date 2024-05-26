/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        layout: "0.8rem 15rem",
      },
      colors: {
        bold: "#0D141C",
        light: "#4F7396",
        "slider-container": "rgba(0,0,0, 0.2)",
      },
      backgroundImage: {
        "intro-image": "url(assets/tree.png)",
        "intro-image-color":
          "linear-gradient(to bottom, rgba(0,0,0, 0.2), rgba(0,0,0, 0.7))",
      },
    },
  },
  plugins: [],
};
