angular.module('app')
  .factory('mvAuth', function(Restangular, mvIdentity, $q) {
    var login = Restangular.all('login');
    var logout = Restangular.all('logout');

    return {
      authenticateUser: function(username, password) {
        var promise = login.post({ username: username, password: password })
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
        var promise = logout.post({logout: true}).then(
          function(resp) {
            mvIdentity.currentUser = undefined;
            return resp;
          }
        );

        return promise;
      }
    }
  });