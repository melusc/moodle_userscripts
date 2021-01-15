const fs = require( 'fs' );

exports.paths = {
  js: [ './src/**/*.js' ],
  scss: [ './src/**/*.scss' ],
  svg: [ './src/**/*.svg', '!./src/**/*.min.svg' ],
  dest: './dist',
  svgDest: './src',
};

exports.dynamicVars = [
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
