const path = require('path')

module.exports = {
  watch: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist/'),
    filename: 'bundle.js'
  },
  module: {
    // v1
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      options: {
        presets: [
          ['react'],
          ['es2015', {'modules': false}]
        ]
      }
    }]
  } // closes module
}
