angular.module('app')
  .factory('mvAuth', function(Restangular, mvIdentity, $q) {
    var session = Restangular.all('session');

    return {
      authenticateUser: function(username, password) {
        var promise = session.post({ username: username, password: password })
          .then(
            function (res) {
              if (res.success) {
                mvIdentity.currentUser = res.user;
                return true;
              } else {
                return false;
              }
            },
            function (err) {
              return $q.reject(err);
            }
          );
        return promise;
      },
      logout: function() {
        var promise = session.remove().then(
          function(resp) {
            mvIdentity.currentUser = undefined;
            return resp;
          }
        );

        return promise;
      }
    }
  });