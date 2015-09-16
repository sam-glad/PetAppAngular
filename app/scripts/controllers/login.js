'use strict';

angular.module('petApp')
  .controller('LoginCtrl', function ($scope, authService) {
    $scope.login = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        authService.userLogin.login($scope.user);
      }
    };
  });
