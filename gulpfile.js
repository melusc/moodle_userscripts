const { src, dest, watch, series, parallel } = require( 'gulp' );
const csso = require( 'gulp-csso' );
const babel = require( 'gulp-babel' );
const svgmin = require( 'gulp-svgmin' );
const rename = require( 'gulp-rename' );
const replace = require( 'gulp-replace' );
const fs = require( 'fs' );
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
    [ ...PATHS.JS, ...PATHS.SCSS ],
    series(
      compSCSS,
      compJS
    )
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
    .pipe( replace(
      /'<INJECT_FILE path="(?<path>.+)" ?\/>'/g,
      (
        match, ...args
      ) => {
        const { path } = args.pop();

        try {
          return `\`${ fs.readFileSync(
            `${ __dirname }\\dist\\${ path }`,
            'utf8'
          ) }\``;
        }
        catch {
          console.error( `"/dist/${ path }" doesn't exist.` );
          return match;
        }
      }
    ) )
    .pipe( dest( PATHS.DEST ) );
}

function minSvg() {
  return src( PATHS.SVG )
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
