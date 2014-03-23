angular.module('app').controller('mvNavbarLoginCtrl', function($scope, mvNotifier, mvIdentity, mvAuth) {

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
});
