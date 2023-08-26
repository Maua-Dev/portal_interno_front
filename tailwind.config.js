/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  important: '#root',
  theme: {
    // colors: {
    //   'navbar-gradient-blue-bottom': '#003399',
    //   'navbar-gradient-blue-top': '#3D65E0',
    //   white: '#FFFFFF'

    //  PASTE IN NAVBAR ClassNames =====> from-navbar-gradient-blue-bottom to-navbar-gradient-blue-top
    // },
    extend: {}
  },
  plugins: []
}
