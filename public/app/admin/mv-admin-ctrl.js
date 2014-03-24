angular.module('app')
  .controller('mvAdminCtrl', function ($scope, mvUserManager) {

    $scope.userManager = mvUserManager;
    /*$scope.users = [];
    mvUserManager.users.then(
      function (res) {
        $scope.users = res;
      }
    );*/
  });