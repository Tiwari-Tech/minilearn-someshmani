/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        udemy: {
          purple: '#a435f0',
          'purple-dark': '#8710d8',
          'purple-light': '#f0e6ff',
          dark: '#1c1d1f',
          secondary: '#6a6f73',
          border: '#d1d7dc',
          surface: '#f7f9fa',
          star: '#f4c430',
        },
      },
    },
  },
  plugins: [],
}
