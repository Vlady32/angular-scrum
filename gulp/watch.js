var gulp        = require('gulp');
var browserSync = require('browser-sync');

module.exports = function () {
  gulp.watch('./src/styles/less/**/*.less', ['less']);
  gulp.watch('./bower.json', ['bower']);
  gulp.watch('./src/**/*.html', browserSync.reload);
  gulp.watch('./src/app/**/*.js', browserSync.reload);
  gulp.watch('./src/app/**/*.js', ['inject']);
};
