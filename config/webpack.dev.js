const paths = require('./paths');

const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = {
	mode: `development`,
	
	devtool: `inline-source-map`,

	devServer: {
		historyApiFallback: true,
		contentBase: paths.build,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},

	plugins: [
		// Only update what has changed on hot reload
		new webpack.HotModuleReplacementPlugin(),
	],
};