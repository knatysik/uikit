'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var normalize = require('node-normalize-scss');

gulp.task('default', ['build', 'server', 'watch']);
gulp.task('build', ['sass','html', 'js', 'assets']);

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: normalize.includePaths,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/js/*.js', ['js'])
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
});

gulp.task('server', function () {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('assets', function () {
  gulp.src('./src/assets/**/*')
    //.pipe(imagemin())
    .pipe(gulp.dest('./build/assets/'))
});