
var express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//var APP_ROOT = process.env.PWD = process.cwd() || __dirname;
var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

var User = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({userName: username}).exec(
      function(err, user) {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    )
  }
));

passport.serializeUser( function(user, done) {
  if (user) {
    done(null, user._id);
  }
});

passport.deserializeUser( function(id, done) {
  User.findOne({_id: id}).exec(
    function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
});

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');