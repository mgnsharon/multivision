'use strict';
angular.module('app', ['ui.router', 'restangular', 'mv.notification']);

angular.module('app').config(function($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('/', { url: '/', templateUrl: '/partials/main/main', controller: 'mvMainCtrl'});
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRestangularFields({ id: '_id' });
});

