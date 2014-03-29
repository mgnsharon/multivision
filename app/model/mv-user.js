angular.module('mv.model.User', [])
  .factory('MVUser', function () {
    var defaults = {
      fname: '',
      lname: '',
      username: '',
      roles: []
    };
    var User = function (model) {
      _.defaults(model, defaults);
      model.hasRole = function (role) {
        if (angular.isDefined(model.roles) && angular.isArray(model.roles)) {
          return model.roles.indexOf(role) > -1;
        }
        return false;
      };
      model.fullName = function () {
        var full = [];
        if (angular.isString(model.fname)) { full.push(model.fname); }
        if (angular.isString(model.lname)) { full.push(model.lname); }
        return full.join(' ');
      };
      return model;
    };

    return User;
  });