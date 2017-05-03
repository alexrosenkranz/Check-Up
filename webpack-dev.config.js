const path = require('path')

module.exports = {
  watch: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: path.join(__dirname, '/browserClient/src/index.js'),
  output: {
    path: path.join(__dirname, '/browserClient/dist/'),
    filename: 'bundle.js'
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     include: path.join(__dirname, '/browserClient/src'),
    //     loader: 'eslint-loader'
    //   }
    // ],
    // v1
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/browserClient/src'),
        loader: 'babel-loader',
        options: {
          presets: [
            ['react'],
            ['es2015', {'modules': false}]
          ]
        }
      }
      // {
      //   test: /\.jsx?$/,
      //   include: path.join(__dirname, '/client/src'),
      //   loader: 'eslint-loader'
      // }
    ]
  } // closes module
}
