var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    path = require('path');

 var env = 'development';

if (env==='development') {
  outputDir = 'builds/development/';
} else {
  outputDir = 'builds/production/';
}

gulp.task('watch', function() {
  gulp.watch('builds/development/js/*.js', ['js']);
  gulp.watch(['builds/development/css/*.css'], ['css']);
  gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/development/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
});

gulp.task('css', function() {
  gulp.src('builds/development/css/*.css')
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'css')))
});

gulp.task('js', function() {
  gulp.src('builds/development/js/*.js')
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
});

// Copy images to production
gulp.task('move', function() {
  gulp.src('builds/development/images/**/*.*')
  .pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'move', 'webserver']);
