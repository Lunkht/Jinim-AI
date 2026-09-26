/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grokBlack: '#000000',
        grokDark: '#0a0a0a',
        grokGray: '#1a1a1a',
      },
    },
  },
  plugins: [],
}
