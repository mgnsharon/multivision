angular.module('mv.resource.Session', ['restangular'])
  .factory('mvSessionResource', function ($q, Restangular) {
    var resource = Restangular.all('session');

    return {
      create: function (user, pass) {
        return resource.post({username: user, password: pass}).then(
          function (res) {
            return res;
          },
          function (err) {
            return $q.reject(err);
          }
        );

      },
      destroy: function () {
        return resource.remove().then(
          function (res) {
            return res;
          },
          function (err) {
            return $q.reject(err);
          }
        );
      }
    }
  });