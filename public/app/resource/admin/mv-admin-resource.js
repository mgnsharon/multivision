angular.module('mv.resource.admin', ['restangular'])
  .config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1/admin');
    RestangularProvider.setRestangularFields({ id: '_id' });
  });