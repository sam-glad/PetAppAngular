angular.module('petApp')
  .controller('IndexCtrl', function($scope, $auth, $window) {
    $scope.signOut = function() {
      $auth.signOut()
        .then(function(resp) {
          $window.location.href = '/';
        })
        .catch(function(resp) {
          console.log(resp); // TODO: Flash an error message instead
        });
    };
  });
