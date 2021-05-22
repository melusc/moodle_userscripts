const {src, dest, watch, series} = require('gulp');
const svgmin = require('gulp-svgmin');
const cache = require('gulp-cached');
const rename = require('gulp-rename');

const paths = {
	svg: ['./src/**/*.svg', '!./src/**/*.min.svg'],
	svgDest: './src'
};

const minSvg = () =>
	src(paths.svg)
		.pipe(cache('svg'))
		.pipe(
			svgmin({
				multipass: true,
				precision: 3,
				plugins: [
					{sortAttrs: true},
					{removeScriptElement: true},
					{removeDimensions: true},
					{
						removeAttrs: {
							attrs: ['class']
						}
					}
				]
			})
		)
		.pipe(
			rename(path => {
				path.extname = '.min.svg';
			})
		)
		.pipe(dest(paths.svgDest));

const start = series(minSvg, () => {
	watch(paths.svg, minSvg);
});

exports.default = start;
exports.start = start;
exports.minSvg = minSvg;
