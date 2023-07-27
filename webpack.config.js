const path = require('path');

module.exports = {
    entry: './src/script.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'build'),
    },
    optimization: {
        minimize: false,
    },
    mode: 'production'
};