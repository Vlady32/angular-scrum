var gulp        = require('gulp'),
    less        = require('gulp-less'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync');

module.exports = function () {
  gulp.src('./src/styles/less/**/*.less')
    .pipe(less())
    .pipe(concat('site.css'))
    .pipe(gulp.dest('src/styles'))
    .pipe(browserSync.reload({stream: true}));
};
