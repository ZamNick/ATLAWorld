var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
	scripts: './js/*.js',
	build: './build'
};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		       .pipe(sourcemaps.init())
		       .pipe(uglify())
		       .pipe(concat('build.js'))
		       .pipe(sourcemaps.write())
		       .pipe(gulp.dest(paths.build));
});

gulp.task('default', ['scripts']);