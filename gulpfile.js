const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

gulp.task('lint', () => {
	return gulp.src(['**/*.js','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('develop', () => {
	nodemon({
		exec: 'node --inspect',
		script: 'server.js',
		ext: 'js',
		tasks: ['lint'],
		env: {'NODE_ENV': 'development'}
	});
});