angular.module('mv.managers.User', ['mv.resource.admin'])
  .factory('mvUserManager', function (mvUserAdminResource) {
    var _users = mvUserAdminResource.getUsers().$object;

    return {
      users: _users
    };
  });
