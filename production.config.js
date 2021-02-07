const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const entry = require( 'webpack-glob-entry' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

// For reuse
const babelConfig = {
  loader: 'babel-loader',
  options: {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h',
          pragmaFrag: 'Fragment',
        },
      ],
    ],
  },
};

module.exports = {
  mode: 'production',
  entry: Object.assign(
    entry(
      entry.basePath( 'src' ),
      path.resolve(
        __dirname,
        'src/**/*.user.tsx'
      )
    ),
    entry(
      entry.basePath( 'src' ),
      path.resolve(
        __dirname,
        'src/**/*.user.js'
      )
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
          compress: {
            passes: 3,
            pure_funcs: [ '__webpack_require__' ],
          },
        },
        extractComments: true,
      } ),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [ path.resolve(
          __dirname,
          'src'
        ) ],
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        include: [ path.resolve(
          __dirname,
          'src'
        ) ],
        exclude: /node_modules/,
        use: [ babelConfig ],
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
