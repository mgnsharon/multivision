angular.module('app')
  .factory('mvAuth', function(Restangular, mvIdentity) {
    var service = Restangular.all('login');

    return {
      authenticateUser: function(username, password) {
        var promise = service.post({ username: username, password: password }).then(
            function (res) {
              if (res.success) {
                mvIdentity.currentUser = res.user;
                return true;
              } else {
                return false;
              }
            },
            function (err) {
              return err;
            }
        );
        return promise;
      }
    }
  });