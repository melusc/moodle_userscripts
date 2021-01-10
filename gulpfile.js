/* globals exports: false, require: false */

const { src, dest, watch } = require( 'gulp' );
const csso = require( 'gulp-csso' );
const babel = require( 'gulp-babel' );
const svgmin = require( 'gulp-svgmin' );
const rename = require( 'gulp-rename' );
const { argv } = require( 'yargs' );
const sass = require( 'gulp-sass' );
const PATHS = {
  JS: [ './src/**/*.js' ],
  SCSS: [ './src/**/*.scss' ],
  SVG: [ './src/**/*.svg', '!./src/**/*.min.svg' ],
  HTML: [ './src/**/*.html' ],
  DEST: './dist',
  SVG_DEST: './src',
};

sass.compiler = require( 'sass' );

function build() {
  compJS();
  minSvg();
  return compSCSS();
}

function start() {
  build();

  watch(
    PATHS.JS,
    compJS
  );
  watch(
    PATHS.SCSS,
    compSCSS
  );
  watch(
    PATHS.SVG,
    minSvg
  );
}

function compSCSS() {
  return src( PATHS.SCSS )
    .pipe( sass() )
    .pipe( csso() )
    .pipe( dest( PATHS.DEST ) );
}

function compJS() {
  return src( PATHS.JS )
    .pipe( babel() )
    .pipe( dest( PATHS.DEST ) );
}

function minSvg() {
  src( PATHS.SVG )
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
        { removeAttrs: {
          attrs: [ 'class' ],
        } },
      ],
    } ) )
    .pipe( rename( path => {
      path.extname = '.min.svg';
    } ) )
    .pipe( dest( PATHS.SVG_DEST ) );
}

exports.default = exports.build = build;
exports.minSvg = minSvg;
exports.compJS = compJS;
exports.compSCSS = compSCSS;
exports.start = start;
