/* globals exports: false, require: false */

const { src, dest, watch } = require( 'gulp' );
const csso = require( 'gulp-csso' );
const npm = require( 'npm' );
const babel = require( 'gulp-babel' );
const svgmin = require( 'gulp-svgmin' );
const paths = {
  js: './src/**/*.js',
  css: './src/**/*.css',
  cssNot: './src/**/_*.css',
  svg: './src/**/*.svg',
};

function build() {
  compJS();
  minSvg();

  return compSCSS()
    .then( () => {
      minCSS();
    } );
}

function buildWatch() {
  build().then( () => {
    watch(
      [ paths.js, paths.css, paths.svg ],
      () => {
        compJS();
        minSvg();
        return minCSS();
      }
    );
  } );
}

function compSCSS( cb ) {
  return new Promise( resolve => {
    npm.load( () => {
      npm.run(
        'sass',
        () => {
          if ( cb ) { cb(); }
          resolve();
        }
      );
    } );
  } );
}

function compJS( ) {
  return src( paths.js )
    .pipe( babel() )
    .pipe( dest( './dist' ) );
}

function minCSS() {
  return src(
    paths.css,
    { ignore: paths.cssNot }
  )
    .pipe( csso() )
    .pipe( dest( './dist' ) );
}

function minSvg() {
  return src( paths.svg )
    .pipe( svgmin( {
      multipass: true,
      precision: 3,
      plugins: [
        {
          sortAttrs: {
            order: [
              'id',
              'width',
              'height',
              'x',
              'x1',
              'x2',
              'y',
              'y1',
              'y2',
              'cx',
              'cy',
              'r',
              'fill',
              'stroke',
              'marker',
              'd',
              'points',
            ],
          },
        },
        { removeScriptElement: true },
        { removeDimensions: true },
      ],
    } ) )
    .pipe( dest( './dist' ) );
}

exports.default = exports.build = build;
exports.minSvg = minSvg;
exports.minCSS = minCSS;
exports.minJS = compJS;
exports.compSCSS = compSCSS;

// eslint-disable-next-line camelcase
exports.build_watch = buildWatch;
