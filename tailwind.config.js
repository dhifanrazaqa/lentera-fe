/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Plus Jakarta Sans", "sans-serif"] },
      backgroundImage: {
        "blue-gradient": "linear-gradient(to top, #0068FF, #549AFF)",
      },
      colors: {
        "base-gray": "#EBECEC",
        "base-puprle": "#9353B5"
      },
    },
  },
  plugins: [],
};
