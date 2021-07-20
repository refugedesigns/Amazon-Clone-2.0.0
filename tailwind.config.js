const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
      },
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/img/category.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".bg-overlay": {
          background:
            "linear-gradient(rgba(151, 22, 9, .8), rgba(211, 24, 5, .8)), url('/img/category.jpg')",
          "background-position": "center",
          "background-size": "cover",
        },
      });
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
