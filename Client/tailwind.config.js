/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '100%',
          md: '640px',
          lg: '768px',
          xl: '1024px',
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [],
}
