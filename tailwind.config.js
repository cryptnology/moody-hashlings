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
        themeLightGrey: '#E9EDF8',
      },
      fontFamily: {
        body: ['Patrick Hand', 'Nunito', 'Quicksand'],
      },
      spacing: {
        570: '35.625rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
