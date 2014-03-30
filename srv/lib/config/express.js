var express = require('express'),
    passport = require('passport'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser');

module.exports = function (app, config) {

  //app.engine('jade', require('jade').__express);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', config.webRoot);
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());

  app.use(expressSession({secret: 'do you like meat'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.webRoot));


  };