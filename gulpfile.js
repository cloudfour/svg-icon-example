var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var path = require('path');

var config = {
  svg: {
    rootAttributes: {
      style: 'position: absolute; width: 0; height: 0;',
      width: 0,
      height: 0
    }
  },
  mode: {
    symbol: {
      dest: '',
      sprite: 'icons.svg'
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

var iconTask = function () {
  return gulp.src('./src/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('.'));
};

gulp.task('icons', iconTask);

module.exports = iconTask;
