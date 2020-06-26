'use strict';

var 
	gulp = require('gulp'),
	fileinclude = require('gulp-file-include'),
	sass = require('gulp-sass'),
    watch = require('gulp-watch');

sass.compiler = require('node-sass');

function htmlbuild() {
	return gulp.src(['src/index.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: 'src/'
		}))
		.pipe(gulp.dest('./build/'));
}

function sassbuild() {
  return gulp.src(['src/scss/main.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
}

function jsbuild() {
	return gulp.src(['src/js/main.js'])
		// todo minify
		.pipe(gulp.dest('./build/'));
}
 
gulp.task('js', jsbuild);
gulp.task('css', sassbuild);
gulp.task('html', htmlbuild);

gulp.task('build', gulp.series(['css', 'js', 'html']));

gulp.task('watch-css', function () {
  return gulp.watch('src/**/*.scss', sassbuild);
});

gulp.task('watch-js', function () {
  return gulp.watch('src/**/*.js', jsbuild);
});

gulp.task('watch-html', function () {
  return gulp.watch('src/**/*.html', htmlbuild);
});

gulp.task('watch', gulp.parallel(['watch-css', 'watch-js', 'watch-html']));

// exports.default = defaultTask