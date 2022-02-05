module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xsm: '470px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    extend: {
      colors: {
        themeLightBlue: '#174463;',
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
