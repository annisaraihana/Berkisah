/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.htmk",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        'merah': '#B62A4B',
        'kuning': '#F9CC41',
        'hijau': '#8AB42E',
        'hitam': '#060606'
      },
      backgroundImage: {
        'base': "url('src/assets/base-bg.png')",
      }

    },
  },
  plugins: [],
}

