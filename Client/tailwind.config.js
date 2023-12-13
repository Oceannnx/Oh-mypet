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
        darkerPri: '#9dc4cd',
        secondaryColor: '#FFFDF3',
      },
      backgroundImage: {
        'bg-dog2': "url('src/assets/bg-dog2.jpg')",
        'bg-cat': "url('src/assets/bg-cat.jpg')",
      },
    },
  },
  plugins: [require('daisyui')],
}
