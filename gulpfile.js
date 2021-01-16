const { src, dest, watch, series, parallel } = require( 'gulp' );
const csso = require( 'gulp-csso' );
const babel = require( 'gulp-babel' );
const svgmin = require( 'gulp-svgmin' );
const rename = require( 'gulp-rename' );
const replace = require( 'gulp-replace' );
const cache = require( 'gulp-cached' );
const sass = require( 'gulp-sass' );

const del = require( 'del' );

const { paths, dynamicVars } = require( './gulp-config' );

sass.compiler = require( 'sass' );

function clean() {
  return del(
    [ 'dist/**', '!dist' ],
    { force: true }
  );
}

const build = parallel(
  minSvg,
  series(
    compSCSS,
    compJS
  )
);

function start() {
  build();

  watch(
    [ ...paths.js, ...paths.scss ],
    series(
      compSCSS,
      compJS
    )
  );

  watch(
    paths.svg,
    minSvg
  );
}

function compSCSS() {
  return src( paths.scss )
    .pipe( cache( 'scss' ) )
    .pipe( sass() )
    .pipe( csso() )
    .pipe( dest( paths.dest ) );
}

function compJS() {
  const result = src( paths.js )
    .pipe( cache( 'javascript' ) );

  for ( const [ replacer, replacement ] of dynamicVars ) {
    result.pipe( replace(
      replacer,
      replacement
    ) );
  }

  return result
    .pipe( babel() )
    .pipe( dest( paths.dest ) );
}

function minSvg() {
  return src( paths.svg )
    .pipe( cache( 'svg' ) )
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
        {
          removeAttrs: {
            attrs: [ 'class' ],
          },
        },
      ],
    } ) )
    .pipe( rename( path => {
      path.extname = '.min.svg';
    } ) )
    .pipe( dest( paths.svgDest ) );
}

exports.default = exports.build = build;
exports.minSvg = minSvg;
exports.compJS = compJS;
exports.compSCSS = compSCSS;
exports.start = start;
exports.clean = clean;
