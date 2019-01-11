const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './index.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'node',
    node: {
    __dirname: false,
    __filename: false,
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts']
    },
    output: {
        library: 'Vocative',
        libraryTarget: 'umd',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'lib/data/*', to: '' },
        ])
    ]
};