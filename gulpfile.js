import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import sync from 'browser-sync';

const html = function() {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
};

const watch = function() {
  gulp.watch('source/*.html', html);
};

const server = function() {
  sync.init({
    notify: false,
    server: {
      baseDir: './build'
    }
  });
};

export default gulp.series(
  html,
  gulp.parallel(
    watch,
    server,
  ),
);
