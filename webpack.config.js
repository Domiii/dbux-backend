const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    globalObject: 'typeof self !== "undefined" ? self : this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new LodashModuleReplacementPlugin
  ],
  externals: [
    // // see: https://github.com/firebase/firebase-js-sdk/issues/2222#issuecomment-538072948
    // function (context, request, callback) {
    //   const regex = /^@?firebase(\/(.+))?/;
    //   // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
    //   // console.debug('FIREBASE', regex.test(request), request);
    //   if (regex.test(request)) {
    //     return callback(null, request, 'umd');
    //   }
    //   callback();
    // },
    nodeExternals({
      allowlist: [
        /\/src\//
      ]
    })
  ]
};

module.exports = config;