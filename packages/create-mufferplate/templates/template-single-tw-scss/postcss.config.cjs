module.exports = {
  plugins: {
    'postcss-import': {},
    '@thedutchcoder/postcss-rem-to-px': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}