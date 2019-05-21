const path = require('path');

const config = {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './_assets/_js/main.js')
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'js/'),
    filename: '[name].js'
  }
}

module.exports = config;
