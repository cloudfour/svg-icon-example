var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var path = require('path');

var config = {
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
  return gulp.src('./src/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('dist'));
});
