/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        keyframes: {
          fadeIn: {
            '0%': {
              opacity: '0',
              transform: 'translateY(10px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            },
          }
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-out forwards',
        }
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['group-hover'],
      transform: ['group-hover'],
      translate: ['group-hover'],
    },
  },

}