const { src, dest, watch, series, parallel } = require( 'gulp' );
const csso = require( 'gulp-csso' );
const babel = require( 'gulp-babel' );
const svgmin = require( 'gulp-svgmin' );
const rename = require( 'gulp-rename' );
const replace = require( 'gulp-replace' );
const fs = require( 'fs' );
const del = require( 'del' );
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

const JS_VARS = [
  [ /'<INJECT_FILE path="(?<path>.+)" ?\/>'/g,
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
    } ],
  [ '__preact_jsd',
    'https://cdn.jsdelivr.net/npm/preact@10.5.10/dist/preact.min.js' ],
  [ '__htmPreact_jsd',
    'https://cdn.jsdelivr.net/npm/htm@3.0.4/preact/standalone.umd.js' ],
  [ '__dayjs_jsd',
    'https://cdn.jsdelivr.net/npm/dayjs@1.10.3/dayjs.min.js' ],
  [ '__dayjs_relativeTime_jsd',
    'https://cdn.jsdelivr.net/npm/dayjs@1.10.3/plugin/relativeTime.js' ],
];

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
  const progress = src( PATHS.JS )
    .pipe( babel() );

  for ( const [ replacer, replacement ] of JS_VARS ) {
    progress.pipe( replace(
      replacer,
      replacement
    ) );
  }

  return progress
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
    .pipe( dest( PATHS.SVG_DEST ) );
}

exports.default = exports.build = build;
exports.minSvg = minSvg;
exports.compJS = compJS;
exports.compSCSS = compSCSS;
exports.start = start;
exports.clean = clean;
