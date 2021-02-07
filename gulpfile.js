const { src, dest, watch } = require( 'gulp' );
const svgmin = require( 'gulp-svgmin' );
const cache = require( 'gulp-cached' );
const rename = require( 'gulp-rename' );

const paths = {
  svg: [ './src/**/*.svg', '!./src/**/*.min.svg' ],
  svgDest: './src',
};

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
        { sortAttrs: true },
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

exports.default = start;
exports.start = start;
exports.minSvg = minSvg;
