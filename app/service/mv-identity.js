angular.module('mv.Identity', [])
  .factory('mvIdentity', function() {

    var currentUser;

    return {
      currentUser: currentUser,
      isAuthenticated: function() {
        return !!this.currentUser;
      },
      isAuthorized: function (role) {
        return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
      }
    }
  });