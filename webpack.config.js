var path = require('path');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
   template: __dirname + '/app/index.html',
   filename: 'index.html',
   inject: 'body'
})

module.exports = {
   mode: 'development',
   entry: __dirname + '/app/index.js',
   module: {
      rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            }
         },
         {
            test: /\.geojson$/,
            loader: 'json-loader'
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
               dynamicTyping: true,
               header: true,
               skipEmptyLines: true
            }
         }
      ]
   },
   output: {
      path: path.resolve(__dirname + '/build'),
      filename: 'bundle.js'
   },
   plugins: [HTMLWebpackPluginConfig]
}
