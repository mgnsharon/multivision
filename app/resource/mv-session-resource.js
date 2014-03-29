angular.module('mv.resource.Session', ['restangular', 'mv.model.User'])
  .factory('mvSessionResource', function ($q, Restangular, MVUser) {
    var me = Restangular.oneUrl('me', 'api/v1/session/me');
    Restangular.extendModel('me', MVUser);

    var resource = Restangular.all('session');
    Restangular.extendModel('session', function (model) {
      if (model.success) {
        model.user = new MVUser(model.user);
      }
      return model;
    });

    var pending = false;

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
      get: function () {
        pending = true;
        return me.get().then(
          function (res) {

            return res;
          },
          function (err) {

            return $q.reject(err);
          }
        )['finally'](
          function () {
            pending = false;
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
    };
  });