/*
  globals
  module: false
*/

module.exports = {
  plugins: [
    '@babel/plugin-syntax-class-properties',
    'htm',
  ],
  /* generatorOpts: {
    minified: true,
    shouldPrintComment: val => ( /^\s*==\/?UserScript==|^\s*@[\w-]/u ).test( val ),
    // shouldPrintComment: val => ( /^#__PURE__$/ ).test( val ) === false,
  }, */
};
