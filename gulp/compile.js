var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

module.exports = function () {
  var sourcesJS = gulp.src('./src/app/scripts/**/*.js', {read: false});

  gulp.src('./src/index.html')
    .pipe(inject(sourcesJS,{relative: true}))
    .pipe(wiredep({
      directory : "src/bower_components"
    }))
    .pipe(gulp.dest('./src'));
};
