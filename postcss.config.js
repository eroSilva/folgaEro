module.exports = ({ file, options, env }) => ({
    plugins: [
        require('autoprefixer'),
        require('css-mqpacker'),
        require('cssnano'),
    ]
})
