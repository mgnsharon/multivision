angular.module('app', ['ui.router', 'restangular']);

angular.module('app').config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('/', { url: '/', templateUrl: '/partials/main', controller: 'mainCtrl'});
});

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.myVar = "Hello Angular Dawg";
});