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
  mode: {
    symbol: {
      dest: '',
      sprite: 'icons.svg'
    }
  },
  svg: {
    rootAttributes: {
      style: 'position: absolute; width: 0; height: 0;',
      width: 0,
      height: 0
    }
  },
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
