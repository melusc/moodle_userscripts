module.exports = {
  plugins: [
    '@babel/plugin-syntax-class-properties',
    'htm',
    [ '@babel/plugin-transform-react-jsx', {
      pragma: 'h',
      pragmaFrag: 'Fragment',
    } ],
  ],
  /* generatorOpts: {
    minified: true,
    shouldPrintComment: val => ( /^\s*==\/?UserScript==|^\s*@[\w-]/u ).test( val ),
  }, */
};
