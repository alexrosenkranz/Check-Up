const path = require('path')

module.exports = {
  // watch: true,
  // devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: path.join(__dirname, '/browserClient/src/index.js'),
  output: {
    path: path.join(__dirname, '/browserClient/dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        },
        exclude: /node_modules/
      }
    ]
  } // closes module
}
