/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust according to your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
