angular.module('app')
  .factory('mvAuth', function(mvIdentity, $q, MVUser, mvSessionResource) {

    return {
      authenticateUser: function(username, password) {
        return mvSessionResource.create(username, password)
          .then(
            function (res) {
              if (res.success) {
                mvIdentity.currentUser = new MVUser(res.user);
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
      logout: function() {
        return mvSessionResource.destroy().then(
          function(resp) {
            mvIdentity.currentUser = undefined;
            return resp;
          }
        );
      }
    }
  });