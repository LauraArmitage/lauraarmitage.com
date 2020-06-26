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
gulp.task('sass', sassbuild);
gulp.task('html', htmlbuild);

gulp.task('build', function() {
	htmlbuild();
	sassbuild();
	jsbuild();
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.html', htmlbuild);
  gulp.sass('src/**/*.scss', sassbuild);
  gulp.sass('src/**/*.js', jsbuild);
});

// exports.default = defaultTask