angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $log) {

  $scope.signin = function (user, password) {
    $log.info('Signin called with:\nusername: ' + user + '\npassword: ' + password+ '\nbut not yet implemented');
  };
});
