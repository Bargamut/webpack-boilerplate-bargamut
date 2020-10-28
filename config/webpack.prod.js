const paths = require('./paths');

const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: `production`,
	
	devtool: false,
	
	output: {
		path: paths.build,
		publicPath: `/`,
		filename: `js/[name].[contenthash].bundle.js`,
	},

	plugins: [
		// Extract CS into separate files
		// Note: style-loader is for development, MiniCssExtractPlugin is for production
		new MiniCssExtractPlugin({
			filename: `styles/[name].[contenthash].css`,
			chunkFilename: `[id].css`,
		}),
	],

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: `css-loader`,
						options: { sourceMap: false, },
					},
					`postcss-loader`,
				],
			},
		],
	},

	optimization: {
		minimize: true,
		minimizer: [
			// for CSS
			new CssMinimizerPlugin(),
			// for JS
			new TerserPlugin(),
		],
		// Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
		runtimeChunk: {
			name: `runtime`,
		},
	},

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});