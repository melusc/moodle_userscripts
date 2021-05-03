const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const entry = require( 'webpack-glob-entry' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

// For reuse
const babelConfig = {
  loader: 'babel-loader',
  options: {
    plugins: [
      '@babel/plugin-transform-runtime',
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h',
          pragmaFrag: 'Fragment',
        },
      ],
      [
        'babel-plugin-replace-identifiers',
        {
          // Tampermonkey's Proxy (which also a builtin) doesn't have Proxy#revocable for some reason
          // It's a bit hacky, but I don't know why Proxy doesn't have revocable because unsafeWindow.Proxy does
          Proxy: 'unsafeWindow.Proxy',
        },
      ],
    ],
  },
};

module.exports = environment => ( {
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.scss', '.css' ],
  },
  mode: 'production',
  entry: entry(
    entry.basePath( 'src' ),
    path.resolve(
      __dirname,
      'src/**/*.user.{js,jsx,ts,tsx}'
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
    minimize: 'PROD' in environment,
    minimizer: [
      new TerserPlugin( {
        terserOptions: {
          format: {
            comments: /^\s*==\/?UserScript==|^\s*@(?!see|ts-ignore)[\w-]/,
          },
          compress: {
            passes: 3,
          },
        },
      } ),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ babelConfig ],
      },
      {
        test: /\.tsx?$/,
        use: [ 'ts-loader' ],
      },
      {
        test: /\.css$/,
        type: 'asset/source',
        use: [ 'csso-loader' ],
      },
      {
        test: /\.scss$/,
        type: 'asset/source',
        use: [ 'csso-loader', 'sass-loader' ],
      },
    ],
  },
} );
