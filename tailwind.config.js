module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    lineClamp: {
      1: 1,
      2: 2,
      3: 3
    },
    extend: {
      backgroundColor: {
        'main-bg': '#f5f7fb',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-line-clamp')
  ],
}