const path = require('path');

module.exports = {
    mode: "none",
    entry: {
        home: {
            import: ['./assets/src/common.js', './assets/src/pages/home.js'],
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'assets/js'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};


