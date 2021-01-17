const { src, dest, watch } = require( 'gulp' );
const svgmin = require( 'gulp-svgmin' );
const cache = require( 'gulp-cached' );
const rename = require( 'gulp-rename' );

const del = require( 'del' );

const paths = {
  svg: [ './src/**/*.svg', '!./src/**/*.min.svg' ],
  svgDest: './src',
};

function clean() {
  return del(
    [ 'dist/**', '!dist' ],
    { force: true }
  );
}

function start() {
  minSvg();

  watch(
    paths.svg,
    minSvg
  );
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

exports.default = exports.start = start;
exports.minSvg = minSvg;
exports.clean = clean;
