const fs = require( 'fs' );

exports.paths = {
  js: [ './src/**/*.js' ],
  scss: [ './src/**/*.scss' ],
  svg: [ './src/**/*.svg', '!./src/**/*.min.svg' ],
  dest: './dist',
  svgDest: './src',
};

exports.dynamicVars = [
  [ /(?:'|")<INJECT_FILE\s(?<json>{.+})\s?\/>(?:'|")/g,
    (
      match, ...args
    ) => {
      const groups = args.pop();
      let json;
      try {
        json = JSON.parse( groups.json );
      }
      catch {
        console.error( 'Invalid json' );
        return match;
      }
      const path = `${ __dirname }\\${ json.path }`;
      const quotes = Boolean( json.quotes );

      try {
        const file = fs.readFileSync(
          path,
          'utf8'
        );
        if ( quotes ) {
          return `\`${ file }\``;
        }
        return file;
      }
      catch {
        console.error( `"${ path }" doesn't exist.` );
        return match;
      }
    } ],
  [ '__preact_jsd', 'https://cdn.jsdelivr.net/npm/preact@10.5.10/dist/preact.min.js' ],
  [ '__htmPreact_jsd', 'https://cdn.jsdelivr.net/npm/htm@3.0.4/preact/standalone.umd.js' ],
  [ '__dayjs_jsd', 'https://cdn.jsdelivr.net/npm/dayjs@1.10.3/dayjs.min.js' ],
  [ '__dayjs_relativeTime_jsd', 'https://cdn.jsdelivr.net/npm/dayjs@1.10.3/plugin/relativeTime.js' ],
  [ '__DOMPurify_jsd', 'https://cdn.jsdelivr.net/npm/dompurify@2.2.6/dist/purify.min.js' ],
  [ '__JSZip_jsd', 'https://cdn.jsdelivr.net/npm/jszip@3.5.0/dist/jszip.min.js' ],
  [ '__FileSaver_jsd', 'https://cdn.jsdelivr.net/npm/filesaver.js@1.3.4/FileSaver.min.js' ],
];
