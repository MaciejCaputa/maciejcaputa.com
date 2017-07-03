const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const bourbon = require('bourbon').includePaths;
const insert = require('gulp-insert');


gulp.task('sass', function() {
  return gulp.src(['assets/stylesheets/main.sass'])
  .pipe(sass({
      includePaths: [bourbon],
      onError: browserSync.notify
  }).on('error', sass.logError))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cssmin())
  .pipe(rename({basename: 'stylesheet', extname: ".pug"}))
  .pipe(insert.prepend('style(amp-custom=\'\').\n\t'))
  .pipe(gulp.dest('./assets/pugfiles'));

});

gulp.task('pug', function() {
  return gulp.src('index.pug')
  .pipe(pug())
  .pipe(gulp.dest('./_site'));
});

gulp.task('js', function() {
  return gulp.src('js/common.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('common.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('_site/js'));
});

gulp.task('images', function() {
  return gulp.src(['assets/images/*'])
  .pipe(gulp.dest('./_site/assets/images'));
});

gulp.task('pdf', function() {
  return gulp.src(['./assets/*.pdf'])
  .pipe(gulp.dest('./_site/assets'));
});

gulp.task('fonts', function() {
  return gulp.src(['./assets/fonts/*'])
  .pipe(gulp.dest('./_site/assets/fonts'));
});

gulp.task('default', ['pug', 'sass', 'pdf', 'images', 'fonts'], function() {

  browserSync({
    server: {
      baseDir: './_site'
    }
  })

  gulp.watch('assets/javascript/**/*.js',                 ['js']);
  gulp.watch('assets/stylesheets/**/*.sass',                     ['sass']);
  gulp.watch(['assets/pugfiles/*.pug', 'index.pug'],   ['pug']);

});
