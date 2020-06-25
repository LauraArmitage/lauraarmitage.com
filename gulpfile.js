'use strict';

var 
	gulp = require('gulp'),
	fileinclude = require('gulp-file-include'),
	sass = require('gulp-sass'),
    watch = require('gulp-watch');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('build', function() {
	return gulp.src(['src/index.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: 'src/'
		}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
  return watch('src/*')
        .pipe(gulp.dest(['sass','build']));
});

// exports.default = defaultTask