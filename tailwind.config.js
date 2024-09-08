/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    colors: {
      'dark': '#0d1113',
      'light': '#ebeced',
      'gray': '#5f6062',
      'light-gray': '#bbb',
      'off-white': '#dce0e1',
      'green': '#cef0d9',
      'bright-green': '#21d16a',
      'blue': '#005bc5',
      'transparent': 'transparent',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
}
