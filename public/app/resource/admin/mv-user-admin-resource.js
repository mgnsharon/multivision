angular.module('mv.resource.admin')
  .factory('mvUserAdminResource', function (Restangular, MVUser) {
    var ra = Restangular.withConfig(function (Configurer) {
      Configurer.setBaseUrl('api/v1/admin');
    });
    ra.extendModel('users', MVUser);
    var resource = ra.all('users');


    return {
      getUsers: function () {
        return resource.getList();
      }
    };
  });