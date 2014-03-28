'use strict';
angular.module('app', [
  'mv.model.User',
  'ui.router',
  'mv.Identity',
  'mv.resource.admin',
  'mv.managers.User',
  'mv.resource.Session',
  'mv.notification',
  'mv.accounts.SignUp',
  'mv.Auth'
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
    .state('/', { url: '/', templateUrl: '/app/main/main.html', controller: 'mvMainCtrl'})
    .state('/signup', { url: '/signup', templateUrl: '/app/account/signup.html', controller: 'mvSignupCtrl'})
    .state('/admin', {
      url: '/admin',
      templateUrl: '/app/admin/admin.html',
      controller: 'mvAdminCtrl',
      resolve: routeAuth.admin
    });
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRestangularFields({ id: '_id' });
});

angular.module('app').run(function ($rootScope, $state, mvAuth) {
  $rootScope.$on('$stateChangeError', function (e, to, toParams, from, fromParams, err) {
    if (err === 'NOT_AUTHORIZED') $state.go('/');
  });
  mvAuth.getSession();
});

