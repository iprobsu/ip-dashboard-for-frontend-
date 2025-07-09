/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'glow-bounce': 'glow-bounce 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'glow-bounce': {
          '0%': {
            transform: 'translateY(0)',
            filter: 'drop-shadow(0 0 4px #3b82f6)',
          },
          '100%': {
            transform: 'translateY(-6px)',
            filter: 'drop-shadow(0 0 15px #3b82f6)',
          },
        },
      },
    },
  },
  plugins: [],
};
