var gulp    = require('gulp');
var connect = require('gulp-connect');

module.exports = function () {
  connect.server({
    root: './dist',
    port: 8088
  });
};
