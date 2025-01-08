module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
          gridTemplateColumns: {
              8: 'repeat(8, minmax(0, 1fr))',
              10: 'repeat(10, minmax(0, 1fr))',
              12: 'repeat(12, minmax(0, 1fr))',
          },
      },
  },
  plugins: [],
};
