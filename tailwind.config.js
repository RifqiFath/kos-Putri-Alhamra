/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marun': '#682D2B',
        'cokelat-marun': '#682D2B',
        'kuning-mas': '#E3BD67',
        'warm-ochre': '#E3BD67',
        'terakota': '#A85A52',
        'cokelat-terakota': '#A85A52',
        'cokelat-tua': '#4A2E2B',
        'dark-chestnut': '#4A2E2B',
        'latar': '#F8FAF9',
        'permukaan': '#FFFFFF',
        'garis': '#E2E8E6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
