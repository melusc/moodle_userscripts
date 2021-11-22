const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const entry = require('webpack-glob-entry');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (environment = {}) => ({
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
		},
		extensions: ['.ts', '.tsx', '.scss', '.css'],
	},
	mode: 'production',
	entry: entry(
		entry.basePath('src'),
		path.resolve(__dirname, 'src/**/*.user.{ts,tsx}'),
	),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].user.js',
		hashFunction: 'xxhash64',
	},
	plugins: [new CleanWebpackPlugin()],
	cache: {
		type: 'filesystem',
		cacheDirectory: path.resolve(__dirname, '.cache'),
		buildDependencies: {
			config: [__filename, path.resolve(__dirname, 'tsconfig.json')],
		},
	},
	optimization: {
		usedExports: true,
		minimize: 'PROD' in environment,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: /^\s*==\/?UserScript==|^\s*@(?!see|ts-ignore)[\w-]/,
					},
					compress: {
						passes: 3,
					},
				},
			}),
		],
	},
	module: {
		rules: [
			{
				// TODO: Remove this when https://github.com/Tampermonkey/tampermonkey/issues/1290 is resolved
				// .js because immer is js
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [
								[
									'babel-plugin-replace-identifiers',
									{
										Proxy: 'unsafeWindow.Proxy',
									},
								],
							],
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
			},
			{
				test: /\.css$/,
				type: 'asset/source',
				use: ['csso-loader'],
			},
			{
				test: /\.scss$/,
				type: 'asset/source',
				use: ['csso-loader', 'sass-loader'],
			},
		],
	},
});
