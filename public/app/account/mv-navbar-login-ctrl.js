angular.module('app').controller('mvNavbarLoginCtrl', function($scope, Restangular, $log) {
  var loginResource = Restangular.all('login');

  $scope.signin = function (user, password) {

    loginResource.post({ userName: user, password: password }).then(
      function (res) {
        if (res.success) {
          $log.info('Logged In');
        } else {
          $log.error('Failed.');
        }
      },
      function (err) {
        $log.error(err);
      }
    );


  };
});
