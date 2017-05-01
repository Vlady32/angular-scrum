var gulp = require('gulp');
var wiredep = require('wiredep').stream;

module.exports = function () {
  gulp.src('./src/index.html')
    .pipe(wiredep({
      directory : "src/bower_components"
    }))
    .pipe(gulp.dest('./src'));
};

