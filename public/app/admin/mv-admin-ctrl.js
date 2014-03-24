angular.module('app')
  .controller('mvAdminCtrl', function ($scope, mvUserManager) {
    $scope.userManager = mvUserManager;
  });