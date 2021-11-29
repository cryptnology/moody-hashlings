module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        themeLightBlue: '#edf2fb',
      },
      fontFamily: {
        body: ['Nunito', 'Quicksand'],
        // title: ['Indie Flower'],
        title: ['Patrick Hand'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
