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
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	output: {
		path: path.resolve(__dirname + '/build'),
		filename: 'transformed.js'
	},
	plugins: [HTMLWebpackPluginConfig]
}
