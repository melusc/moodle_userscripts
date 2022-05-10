import {fileURLToPath} from 'node:url';

import TerserPlugin from 'terser-webpack-plugin';
import entry from 'webpack-glob-entry';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

const resolve = p => fileURLToPath(new URL(p, import.meta.url));

const config = (environment = {}) => ({
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
		resolve('src/**/*.user.{ts,tsx}'),
	),
	output: {
		path: resolve('dist/userscript-out'),
		filename: '[name].user.js',
		hashFunction: 'xxhash64',
	},
	plugins: [new CleanWebpackPlugin()],
	cache: {
		type: 'filesystem',
		cacheDirectory: resolve('.cache'),
		buildDependencies: {
			config: [resolve(import.meta.url), resolve('tsconfig.json')],
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

export default config;
