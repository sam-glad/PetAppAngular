'use strict';

angular.module('petApp')
  .controller('UserRegistrationCtrl', function ($scope, authService) {
    $scope.register = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        authService.userRegistration.register($scope.user);
      }
    };
  });
