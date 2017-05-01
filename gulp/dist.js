var gulp   = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css');

module.exports = function () {

  gulp.src('./src/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/app/**/*.html')
    .pipe(gulp.dest('dist/app/'));

  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('dist/img'));

  gulp.src('./src/styles/fonts/**/*')
    .pipe(gulp.dest('dist/styles/fonts'));

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('dist/'));

  gulp.src('./src/styles/site.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/styles'));

  gulp.src('./src/bower_components/font-awesome/styles/fonts/fontawesome-webfont.*')
    .pipe(gulp.dest('dist/styles/fonts/'));

};
