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
        "bold-t": "rgba(13, 20, 28, 0.9)",
        "switch-container": "rgba(13, 20, 28, 0.5)",
        light: "#4F7396",
        "slider-container": "rgba(0,0,0, 0.2)",
      },
      backgroundImage: {
        "intro-image": "url(assets/tree.png)",
        "intro-image-color":
          "linear-gradient(to bottom, rgba(0,0,0, 0.2), rgba(0,0,0, 0.7))",
      },
      animation: {
        appear: "appear 0.2s ease-in-out alternate",
      },
      keyframes: {
        appear: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
