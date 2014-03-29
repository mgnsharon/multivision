angular.module('mv.accounts.SignUp', [])
  .controller('mvSignupCtrl', function ($scope, $log) {

    $scope.userForm = {
      username: '',
      fname: '',
      lname: '',
      password: ''
    };

    $scope.createUser = function (data) {
      $log.info(data);
    };

  });