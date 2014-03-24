angular.module('mv.managers.User', ['mv.resource.admin'])
  .factory('mvUserManager', function (mvUserAdminResource) {
    var _users = mvUserAdminResource.getUsers().getList();

    return {
      users: _users
    };
  });
