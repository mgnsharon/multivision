// Karma configuration
// Generated on Mon Mar 24 2014 18:02:18 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      'public/vendor/jquery/dist/jquery.js',
      'public/vendor/bootstrap/dist/js/bootstrap.js',
      'public/vendor/lodash/dist/lodash.js',
      'public/vendor/angular/angular.js',
      'public/vendor/angular-mocks/angular-mocks.js',
      'public/vendor/restangular/dist/restangular.js',
      'public/vendor/angular-ui-router/release/angular-ui-router.js',
      'test/test-app.js',
      'public/app/**/*.js',
      'public/vendor/toastr/toastr.js',
      'test/spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'public/app/app.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing spec whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the spec and exits
    singleRun: false
  });
};
