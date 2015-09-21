'use strict';

angular.module('petApp')
  .controller('LoginCtrl', function($scope, $auth, $window) {
    $scope.submitted = false;

    $scope.login = function(isValid) {
      $scope.submitted = true;

      if (isValid) {
        $auth.submitLogin($scope.loginForm)
          .then(function(resp) {
            $window.location.href = '/';
          })
          .catch(function(resp) {
            console.log(resp); // TODO: Flash an error message instead
          });
      };
    }
  });
