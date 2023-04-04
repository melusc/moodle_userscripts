import {fileURLToPath} from 'node:url';

import TerserPlugin from 'terser-webpack-plugin';
import entry from 'webpack-glob-entry';
import sveltePreprocess from 'svelte-preprocess';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

const resolve = p => fileURLToPath(new URL(p, import.meta.url));

const config = (environment = {}) => ({
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
			svelte: resolve('node_modules/svelte'),
		},
		extensions: ['.ts', '.tsx', '.scss', '.css', '.svelte'],
		extensionAlias: {
			'.js': ['.js', '.ts', '.tsx'],
		},
	},
	mode: 'production',
	entry: entry(entry.basePath('src'), resolve('src/**/*.user.{ts,tsx}')),
	output: {
		path: resolve('dist/userscript-out'),
		filename: '[name].user.js',
		hashFunction: 'xxhash64',
	},
	plugins: 'PROD' in environment ? [new CleanWebpackPlugin()] : undefined,
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
						// Allow ==UserScript== and ==/UserScript==
						// Allow patterns like @version or @run-at
						// Disallow @see, @ts-ignore, @ts-expect-error
						comments:
							/^\s*==\/?UserScript==|^\s*@(?!see|ts-ignore|ts-expect-error)[\w-]/,
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
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						preprocess: sveltePreprocess(),
					},
				},
			},
			{
				// Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false,
				},
			},
		],
	},
});

export default config;
