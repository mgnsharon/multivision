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
    isAdmin: function() {
      return !!this.currentUser && this.currentUser.isAdmin();
    }
  }
});