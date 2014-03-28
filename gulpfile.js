/*global require*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  ngmin = require('gulp-ngmin'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  clean = require('gulp-clean'),
  nodemon = require('gulp-nodemon');

var paths = {
  src: {
    srv: {
      server: 'server.js',
      libs: 'server'
    },
    client: {
      js: ['public/app/**/*.js'],
      css: ['public/css/**/*.styl']
    }
  },
  build: {
    server: 'build/dist',
    webapp: 'build/dist/public',
    mobile: 'build/mobile'
  }
};

gulp.task('lint:srv', function () {
  gulp.src('srv/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('develop', function () {
  nodemon({
    script: 'srv/server.js',
    ext: 'js',
    ignore: [
      'app',
      'node_modules',
      'build',
      'test',
      'gulpfile.js',
      'karma.conf.js'
    ]})
    .on('change', ['lint:srv'])
    .on('restart', function () {
      console.log('restarted dog!')
    });
});

gulp.task('dist:server', function () {
  gulp.src('srv/**')
    .pipe(gulp.dest('build/srv'));
});


gulp.task('mobile:scripts', function () {
  gulp.src(paths.src.client.js)
    .pipe(concat('scripts.js'))
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(gulp.dest(paths.build.mobile.concat('/scripts')));
});

gulp.task('lint', function () {
  gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('mobile:styles', function () {
  gulp.src(paths.src.client.css)
    .pipe(styl({whitespace: true}))
    .pipe(gulp.dest(paths.build.mobile.concat('/css')));
});


gulp.task('clean:mobile', function () {
  gulp.src('build/mobile/**', {read: false})
    .pipe(clean());
});

gulp.task('clean:webapp', function () {
  gulp.src('build/dist/public/**', {read: false})
    .pipe(clean());
});

gulp.task('clean:server', function () {
  gulp.src(['build/dist/server.js', 'build/dist/server/**'], {read: false})
    .pipe(clean());
});

gulp.task('mobile', ['lint', 'clean:mobile', 'mobile:scripts', 'mobile:styles']);