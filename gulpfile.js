var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var browserSync = require('browser-sync').create();
var path = require('path');

var SRC = './src';
var DEST = './dist';

/**
 * Icons
 */

var svgSpriteConfig = {
  // Compile a single `icons.svg` file, with each icon asset included as a
  // <symbol> therein.
  mode: {
    symbol: {
      dest: '',
      sprite: 'icons.svg'
    }
  },

  // Add attributes to the root SVG element to insure it isn't visible in case
  // the polyfill needs to inject it into the page itself.
  svg: {
    rootAttributes: {
      style: 'position: absolute; width: 0; height: 0;',
      width: 0,
      height: 0
    }
  },

  // Set the ID attribute of each symbol to its filename (minus extension) plus
  // the suffix `-icon` to avoid conflicts with any IDs in the same document.
  shape: {
    id: {
      generator: function (name) {
        return path.basename(name, path.extname(name)) + '-icon';
      }
    }
  }
};

gulp.task('icons', function () {
  return gulp.src(SRC + '/icons/**/*.svg')
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream());
});

/**
 * Static files
 */

gulp.task('static', function () {
  return gulp.src(SRC + '/static/**/*')
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream());
});

/**
 * Development-related tasks
 */

gulp.task('serve', function (cb) {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  }, cb);
});

gulp.task('watch', function () {
  gulp.watch(SRC + '/icons/**/*.svg', ['icons']);
  gulp.watch(SRC + '/static/**/*', ['static']);
});

gulp.task('default', ['icons', 'static', 'serve', 'watch']);
