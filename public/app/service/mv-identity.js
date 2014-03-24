angular.module('app').factory('mvIdentity', function($window, MVUser) {

  var currentUser;
  if (!!$window.bootstrappedUserObject) {
    currentUser = new MVUser($window.bootstrappedUserObject);
  }
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