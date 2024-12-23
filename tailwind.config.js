/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#000000",
          white: "#FFFFFF",
          // main: "#11508C",
          main: "#22c55e",
          secondary: "#B1D362",
          lightYellow: "#FCFF45",
          grayish: "#3C3C4399",
          ash: "#B5C9DB",
        },
      },
    },
  },
  plugins: [],
};
