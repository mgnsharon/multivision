angular.module('mv.resource.admin')
  .factory('mvUserAdminResource', function (Restangular) {
    var ra = Restangular.withConfig(function (Configurer) {
      Configurer.setBaseUrl('api/v1/admin');
    });
    ra.extendModel('users', function (model) {
      model.hasRole = function (role) {
        return model.roles.indexOf(role) > -1;
      };
      model.fullName = function () {
        return model.fname + ' ' + model.lname;
      };
      return model;
    })
    var resource = ra.all('users');


    return {
      getUsers: function () {
        return resource.getList();
      }
    };
  });