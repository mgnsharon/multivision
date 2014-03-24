var passport = require('passport');

exports.authenticate = function(req, res, next) {
  var auth = passport.authenticate('local', function(err, user) {
    if (err) { res.send(500,{reason: err}); }
    if (!user) { res.send({success: false}); }

    req.logIn(user, function (err) {
      if (err) { return next(err); }
      res.send({success: true, user: user});
    })
  });
  auth(req, res, next);
};

exports.requiresAPILogin = function (req, res, next) {
  if(!req.isAuthenticated()) {
    res.send(403);
  } else {
    next();
  }
};

exports.requiresRole = function (role) {
  return function (req, res, next) {
    if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.send(403);
    } else {
      next();
    }
  }
};