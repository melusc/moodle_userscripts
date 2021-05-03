// The way webpack is set up
// the styles will be strings

declare module '*.scss' {
  const classes: string;
  export default classes;
}

declare module '*.css' {
  const classes: string;
  export default classes;
}
