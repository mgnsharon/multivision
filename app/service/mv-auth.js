angular.module('mv.Auth', ['mv.Identity', 'mv.model.User', 'mv.resource.Session'])
  .factory('mvAuth', function ($q, mvIdentity, MVUser, mvSessionResource) {

    var sessionGet;
    return {
      authenticateUser: function (username, password) {
        return mvSessionResource.create(username, password)
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
      },
      getSession: function () {
        if (angular.isUndefined(sessionGet)) {
          sessionGet = mvSessionResource.get().then(
            function (resp) {
              mvIdentity.currentUser = resp;
              return resp;
            },
            function (err) {
              return $q.reject(err);
            }
          );
        }
        return sessionGet;
      },
      logout: function () {
        return mvSessionResource.destroy().then(
          function (resp) {
            mvIdentity.currentUser = undefined;
            return resp;
          }
        );
      },
      authorizeCurrentUserForRoute: function (role) {
        this.getSession().then(
          function () {
            if (mvIdentity.isAuthorized(role)) {
              return true;
            } else {
              return $q.reject('NOT_AUTHORIZED');
            }
          }
        );

      }
    };
  });