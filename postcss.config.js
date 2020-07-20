module.exports = ({ env }) => ({
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    env === 'dev' ? false : require('cssnano'),
  ],
})
