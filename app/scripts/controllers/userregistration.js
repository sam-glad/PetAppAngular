'use strict';

angular.module('petApp')
  .controller('UserRegistrationCtrl', function ($scope, authService) {
    $scope.register = function() {
      $scope.user.password_confirmation = $scope.user.passwordConfirmation;
      authService.register($scope.user);
    };
  });
