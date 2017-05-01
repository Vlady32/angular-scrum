var gulp            = require('gulp');
var inject          = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');


module.exports = function () {

  var injectFiles = gulp.src('src/app/**/*.js').pipe(angularFilesort());

  gulp.src('src/index.html')
    .pipe(inject(injectFiles, {relative: true}))
    .pipe(gulp.dest('src'));
};


