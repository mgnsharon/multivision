'use strict';
angular.module('app', [
  'ui.router',
  'mv.resource.admin',
  'mv.managers.User',
  'mv.resource.Session',
  'mv.notification'
]);

angular.module('app').config(function($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider) {
  var routeAuth = {
    admin: {
      auth: function (mvAuth) {
        return mvAuth.authorizeCurrentUserForRoute('admin');
      }
    }
  };

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('/', { url: '/', templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
    .state('/admin', {
      url: '/admin',
      templateUrl: '/partials/admin/admin',
      controller: 'mvAdminCtrl',
      resolve: routeAuth.admin
    });
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRestangularFields({ id: '_id' });
});

angular.module('app').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (e, to, toParams, from, fromParams, err) {
    if (err === 'NOT_AUTHORIZED') $state.go('/');
  });
});

