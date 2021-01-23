const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const entry = require( 'webpack-glob-entry' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = {
  mode: 'production',
  entry: entry(
    entry.basePath( 'src' ),
    path.resolve(
      __dirname,
      'src/**/*.user.js'
    )
  ),
  output: {
    path: path.resolve(
      __dirname,
      'dist'
    ),
    filename: '[name].user.js',
  },
  plugins: [ new CleanWebpackPlugin() ],
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(
      __dirname,
      '.cache'
    ),
    buildDependencies: {
      config: [ __filename ],
    },
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin( {
        terserOptions: {
          format: {
            comments: /^\s*==\/?UserScript==|^\s*@(?!see)[\w-]/,
          },
        },
        extractComments: true,
      } ),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.resolve(
          __dirname,
          'src'
        ) ],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [ '@babel/plugin-proposal-class-properties' ],
              presets: [ 'preact' ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        type: 'asset/source',
        use: [ 'csso-loader', 'sass-loader' ],
      },
      {
        test: /\.css$/,
        type: 'asset/source',
        use: [ 'csso-loader' ],
      },
    ],
  },
};
