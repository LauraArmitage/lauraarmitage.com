'use strict';

var 
	gulp = require('gulp'),
	fileinclude = require('gulp-file-include'),
	sass = require('gulp-sass')(require('sass')),
  watch = require('gulp-watch');
 
gulp.task('js', function() {
	return gulp.src(['src/js/main.js'])
		// todo minify
		.pipe(gulp.dest('./build/'));
});

gulp.task('css', function() {
  return gulp.src(['src/scss/main.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
	return gulp.src(['src/index.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: 'src/'
		}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('img', function() {
	return gulp.src(['img/*'])
		.pipe(gulp.dest('./build/images/'));
});

gulp.task('build', gulp.series(['css', 'js', 'html', 'img']));

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