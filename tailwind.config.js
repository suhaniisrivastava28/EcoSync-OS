/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF6F0',
          100: '#F4EBE1',
          200: '#E9DACB',
          300: '#DFC7B2',
          400: '#CFB195',
          500: '#B89270',
          600: '#9C7250',
          700: '#7F5539',
          800: '#543622',
          900: '#2A1A0F',
          950: '#191009',
        },
        latte: {
          card: '#E8D5C4',
          subtle: '#F6EFE9',
          dark: '#1D1A17',
          surface: '#DFCBBA',
          pill: '#1A1816',
        },
        eco: {
          accent: '#4d928f',
          mint: '#e1f0ec',
          base: '#f2f8f6',
          dark: '#1a3331',
          light: '#eff7f5',
          emerald: '#2b5f5c',
        },
        ink: {
          DEFAULT: '#191614',
          muted: '#524B46',
          light: '#7A726C',
        }
      },
      borderRadius: {
        '24': '24px',
        '32': '32px',
        'bento': '24px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 14px 40px rgba(0, 0, 0, 0.07)',
        'glow-mint': '0 0 25px rgba(77, 146, 143, 0.35)',
        'glow-amber': '0 0 25px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
}

