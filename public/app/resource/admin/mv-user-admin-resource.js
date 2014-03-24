angular.module('mv.resource.admin')
  .factory('mvUserAdminResource', function (Restangular) {

    var resource = Restangular.all('users');


    return {
      getUsers: function () {
        return resource.getList();
      }
    };
  });