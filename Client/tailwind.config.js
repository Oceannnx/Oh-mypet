/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [],
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue1: '#8ECDDD',
      },
    },
  },
  plugins: [require('daisyui')],
}
