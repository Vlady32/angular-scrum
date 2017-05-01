var browserSync  = require('browser-sync');

module.exports = function () {

  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
};
