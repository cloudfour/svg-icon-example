var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var browserSync = require('browser-sync').create();
var ghpages = require('gh-pages');
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

  shape: {
    // Include titles and descriptions from this file.
    meta: SRC + '/icons/icons.yaml',
    // Append `-icon` to ID names to avoid conflicts if polyfill injects sprite
    // directly into the document.
    id: {
      generator: '%s-icon'
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

gulp.task('build', ['icons', 'static']);

gulp.task('deploy', ['build'], function (cb) {
  ghpages.publish(path.join(process.cwd(), DEST), cb);
});

gulp.task('serve', ['build'], function (cb) {
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

gulp.task('default', ['serve', 'watch']);
