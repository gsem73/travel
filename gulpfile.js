import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import sync from 'browser-sync';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';

const html = function() {
  return gulp.src('source/*.html')
    .pipe(replace('style.css', 'style.min.css') )
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
};

const css = function() {
  return gulp.src('source/css/style.css')
    .pipe(postcss([
        autoprefixer,
        csso,
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
};

const watch = function() {
  gulp.watch('source/*.html', html);
  gulp.watch('source/**/*.css', css);
};

const server = function() {
  sync.init({
    notify: false,
    ui: false,
    server: {
      baseDir: './build'
    }
  });
};

export default gulp.series(
  html,
  css,
  gulp.parallel(
    watch,
    server,
  ),
);
