var express = require('express'),
    passport = require('passport');

module.exports = function (app, config) {

  app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.session({secret: 'do you like meat'}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + '/public'));
  });

}