angular.module('mv.accounts.SignUp', []).
  controller('mvSignupCtrl', function ($scope, $location, mvAuth, mvNotifier) {

    $scope.userForm = {
      username: '',
      fname: '',
      lname: '',
      password: ''
    };

    $scope.createUser = function (data) {

    };

  });