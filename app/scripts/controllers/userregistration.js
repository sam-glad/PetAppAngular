'use strict';

angular.module('petApp')
  .controller('UserRegistrationCtrl', function($scope, $auth, $window) {
    $scope.submitted = false;
    $scope.register = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $auth.submitRegistration($scope.registrationForm)
          .then(function(resp) {
            $window.location.href = '/';
          })
          .catch(function(resp) {
            console.log(resp); // TODO: Flash an error message instead
          });
      }
    };
  });
