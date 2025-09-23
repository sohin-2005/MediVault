/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(240, 5%, 84%)",   // used for border-border
        ring: "hsl(240, 5%, 64%)",     // used for outline-ring/50
        background: "#ffffff",         // used for bg-background
        foreground: "#000000",         // used for text-foreground
      },
    },
  },
  plugins: [],
}
