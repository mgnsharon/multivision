angular.module('app').factory('MVUser', function() {
  var User = function(options) {
    this.fname = options.fname || '';
    this.lname = options.lname || '';
    this.username = options.username || '';
    this.roles = options.roles || [];
  };

  User.prototype.hasRole = function(role) {
    return this.roles && this.roles.indexOf(role) > -1;
  };

  User.prototype.fullName = function() {
    return this.fname.concat(' ').concat(this.lname);
  };

  return User;
});