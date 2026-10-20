/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gg: {
          dark: '#0F4A2B',
          'dark-hover': '#0B3820',
          cream: '#F5F5EE',
          border: '#E3E3DC',
          card: '#FFFFFF',
          coral: '#EE997B',
          ochre: '#D69E45',
          red: '#E05353',
          muted: '#767C74',
          subtle: '#EDEFEA',
          sage: '#DDE2D8',
          text: '#171E19',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 74, 43, 0.05)',
        'float': '0 10px 30px -4px rgba(15, 74, 43, 0.12)',
        'glow': '0 0 25px rgba(15, 74, 43, 0.25)',
      }
    },
  },
  plugins: [],
}
