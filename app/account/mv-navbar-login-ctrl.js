angular.module('app').controller('mvNavbarLoginCtrl', function($scope, mvNotifier, mvIdentity, mvAuth, $location, $log) {

  $scope.identity = mvIdentity;

  $scope.signin = function (user, password) {
    mvAuth.authenticateUser(user, password).then(
      function (authenticated) {
        if (authenticated) {
          mvNotifier.success('You have successfully logged in.', 'Yo, Dawg');
        } else {
          mvNotifier.error('Invalid username/password.', 'You Suck');
        }
      },
      function (reason) {
        mvNotifier.error(reason, 'We Suck.');
      }
    );
  };

  $scope.signout = function() {
    mvAuth.logout().then(
      function(resp) {
        $log.info(resp);
        $scope.username = '';
        $scope.password = '';
        mvNotifier.success('You have been logged out.', 'Cya Beyotch');
        $location.path('/');
      }
    )
  };


});
