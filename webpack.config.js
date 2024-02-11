const path = require('path');
const webpack = require('webpack');

module.exports = (env) =>{

    const isProduction = env.NODE_ENV === 'production';
    const envFile = isProduction ? '.env.production' : '.env.development';
    const envPath = path.resolve(__dirname, envFile);
    const envVars = require('dotenv').config({ path: envPath }).parsed || {};

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new webpack.DefinePlugin({
              'process.env': JSON.stringify(envVars),
            }),
          ]
    };
};