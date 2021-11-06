import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';

const html = function() {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('build'));
};

const watch = function() {
  gulp.watch('source/*.html', html);
};

export default watch;
