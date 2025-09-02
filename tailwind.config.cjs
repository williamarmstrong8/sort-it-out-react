/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        accent: '#D4AF37',
        'accent-dark': '#1e3a5f',
        text: '#1a1a1a',
        background: '#FFFFFF',
        'card-shadow': 'rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        'easing': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '0.4s',
      },
      animation: {
        'fadeInUp': 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fadeIn': 'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          'to': {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
