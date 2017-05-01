var gulp = require('gulp');

//launch server on specified port and root folder is /app
gulp.task('connect', require('./gulp/connect'));

//launch server on specified port and root folder is /dist
gulp.task('connect:dist', require('./gulp/connectDist'));

//execute next tasks: less, bower, inject
gulp.task('compile', ['less'], require('./gulp/compile'));

//compilation less files to site.css
gulp.task('less',require('./gulp/less'));

//Automatic injection bower components (css, js) in index.html
gulp.task('bower', require('./gulp/bower'));

//Automatic injection users scripts in index.html
gulp.task('inject', require('./gulp/inject'));

//Automatically reload page after editing
gulp.task('browser-sync', require('./gulp/browsersync'));

//Automatically execute tasks after editing specified files
gulp.task('watch', ['browser-sync', 'less'], require('./gulp/watch'));

//Default task
gulp.task('default', ['compile', 'watch']);

//Create finished project for deploying
gulp.task('dist', ['less'], require('./gulp/dist'));





