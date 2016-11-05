var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    cssmin      = require('gulp-cssmin'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    cp          = require('child_process'),
    jade        = require('gulp-jade'),
    bourbon     = require('bourbon').includePaths;

var insert = require('gulp-insert');


gulp.task('sass', function() {
  return gulp.src(['assets/stylesheets/main.sass'])
  .pipe(sass({
      includePaths: [bourbon],
      onError: browserSync.notify
  }).on('error', sass.logError))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cssmin())
  .pipe(rename({basename: 'stylesheet', extname: ".jade"}))
  .pipe(insert.prepend('style(amp-custom=\'\').\n\t'))
  .pipe(gulp.dest('./assets/jadefiles'));

});

gulp.task('jade', function() {
  return gulp.src('index.jade')
  .pipe(jade())
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

gulp.task('default', ['jade', 'sass', 'pdf', 'images', 'fonts'], function() {

  browserSync({
    server: {
      baseDir: './_site'
    }
  })

  gulp.watch('assets/javascript/**/*.js',                 ['js']);
  gulp.watch('assets/stylesheets/**',                     ['sass']);
  gulp.watch(['assets/jadefiles/*.jade', 'index.jade'],   ['jade']);

});
