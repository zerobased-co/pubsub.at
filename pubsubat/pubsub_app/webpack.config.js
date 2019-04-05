const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist/static',
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        GRAPHQL_HOST: JSON.stringify(process.env.GRAPHQL_HOST),
      },
    }),
    new BundleTracker({
      path: __dirname + '/dist/static/',
      filename: 'webpack-stats.json'
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  }
};
