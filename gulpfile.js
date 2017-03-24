'use strict';

var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('develop', ['nodemon'], function () {
  gulp.watch('./public/stylesheets/**/*.styl', ['stylus']);
  gulp.watch([
    './public/javascripts/**/*.js',
    '!./public/javascripts/bundle.js',
    '!./public/javascripts/bundle.min.js'
  ],
  ['browserify']
  );
});

gulp.task('build', ['del:map', 'stylus', 'browserify'], function () {});

gulp.task('del:map', function () {
  return del.sync(['./public/javascripts/bundle.min.js.map', './public/stylesheets/style.min.css.map']);
});

gulp.task('nodemon', ['browserSync'], function () {

  var stream = $.nodemon({
    script: './bin/www',
    ext: 'js',
    ignore: './public/javascripts/'
  });

  stream
    .on('start')
    .on('change', function () {
      console.log('change');
    })
    .on('restart', function () {
      browserSync.reload({stream: true});
      console.log('restarted!');
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10);  // restart the server in 10 seconds
    });

});

gulp.task('browserSync', function() {

  browserSync.init({
    proxy: 'localhost:3000',
    port: 5000,
    open: false,
    files: [
      './views/**/*.pug'
    ]
  });

});

gulp.task('browserify', function() {
  return browserify('./public/javascripts/script.js', { debug: true })
    .bundle()
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('bundle.min.js'))
    .pipe($.plumber())
    .pipe(buffer())
    .pipe($.if(isDevelopment, $.sourcemaps.init({loadMaps: true})))
    .pipe($.uglify())
    .pipe($.if(isDevelopment, $.sourcemaps.write('.')))
    .pipe(gulp.dest('./public/javascripts/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('stylus', function () {
  return gulp.src('./public/stylesheets/style.styl')
    .pipe($.plumber())
    .pipe($.if(isDevelopment, $.sourcemaps.init()))
    .pipe($.stylus())
    .pipe($.autoprefixer())
    .pipe($.cssnano())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.if(isDevelopment, $.sourcemaps.write('.')))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('jslint', function() {
  return gulp.src('**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('stylelint', function () {
  return gulp.src('./public/stylesheets/**/*.styl')
    .pipe($.stylint())
    .pipe($.stylint.reporter());
});
