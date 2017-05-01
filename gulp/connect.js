var gulp    = require('gulp');
var connect = require('gulp-connect');

module.exports = function () {
  connect.server({
    root: './src/app',
    port: 8080
  });
};