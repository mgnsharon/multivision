/*global require*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  ngmin = require('gulp-ngmin'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  clean = require('gulp-clean'),
  nodemon = require('gulp-nodemon'),
  jade = require('gulp-jade'),
  ngtemplates = require('gulp-angular-templatecache'),
  compass = require('gulp-compass'),
  bowerFiles = require('gulp-bower-files'),
  inject = require('gulp-inject'),
  es = require('event-stream'),
  _ = require('lodash');

var paths = {
  templates: ['app/**/*.jade', '!app/partials/**'],
  vendor: ['bower_components/**', '!bower_components/bootstrap/**'],
  src: {
    srv: {
      server: 'server.js',
      libs: 'server'
    },
    client: {
      js: ['app/**/*.js'],
      css: ['app/assets/sass/**/*.sass']
    }
  },
  build: {
    server: 'build/dist',
    webroot: 'build/public',
    webapp: 'build/public/app',
    mobile: 'build/mobile'
  }
};

gulp.task('lint:srv', function () {
  gulp.src('srv/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('copy:vendor', function () {
  bowerFiles({debugging: true})
    .pipe(gulp.dest('build/public/vendor'));
});

gulp.task('jade:index', function () {
  gulp.src('app/partials/index.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('build/public'));
});

gulp.task('jade:vendor', function () {
  gulp.src('build/public/index.html')
    .pipe(inject(bowerFiles({read: false}), {starttag: '<!-- inject:vendor:js -->'}))
    .pipe(gulp.dest('build/public/index.html'));

});

gulp.task('dev:scripts', function () {
  gulp.src(paths.src.client.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(gulp.dest(paths.build.webapp));
});

gulp.task('dev:templates', function () {
  gulp.src(paths.templates)
    .pipe(jade())
    .pipe(ngtemplates('mv-tpls.js', {
      module: 'mv.tpls',
      standalone: true,
      root: 'app/templates'
    }))
    .pipe(gulp.dest('build/public/app'));
});

gulp.task('watch:dev', function () {
  gulp.watch(paths.templates, ['dev:templates']);
  gulp.watch(paths.src.client.js, ['dev:scripts']);
  gulp.watch(paths.src.client.css, ['dev:styles']);
  gulp.watch('app/partials/**/*.jade', ['jade:index']);
});

gulp.task('serve:dev', function () {
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

gulp.task('dev:styles', function () {
  gulp.src('app/assets/sass/main.sass')
    .pipe(compass({
      project: __dirname,
      css: paths.build.webapp.concat('/styles'),
      sass: 'app/assets/sass'
    }))
    .pipe(gulp.dest(paths.build.webroot.concat('/styles')));
});


gulp.task('clean:mobile', function () {
  gulp.src('build/mobile/**', {read: false})
    .pipe(clean());
});

gulp.task('clean:webapp', function () {
  gulp.src('build/public/**', {read: false})
    .pipe(clean());
});

gulp.task('clean:server', function () {
  gulp.src(['build/dist/server.js', 'build/dist/server/**'], {read: false})
    .pipe(clean());
});

gulp.task('mobile', ['lint', 'clean:mobile', 'mobile:scripts', 'mobile:styles']);

gulp.task('dev', ['clean:webapp', 'dev:styles', 'jade:index', 'copy:vendor', 'dev:scripts', 'dev:templates', 'serve:dev', 'watch:dev']);