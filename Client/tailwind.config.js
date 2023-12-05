/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [],
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#8ECDDD',
        secondaryColor: '#FFFDF3',
      },
    },
  },
  plugins: [require('daisyui')],
}
