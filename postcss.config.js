module.exports = ({ file, options, env }) => ({
    plugins: [
        require('autoprefixer'),
        require('css-mqpacker'),
        (env != 'dev') ? require('cssnano') : false,
    ]
})
