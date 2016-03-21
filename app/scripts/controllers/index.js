angular.module('petApp')
  .controller('IndexCtrl', function($scope, $location, $auth, $window) {
    $scope.isActive = function (path) {
      return $location.path() === path;
    }

    $scope.signOutUser = function() {
      $auth.signOut()
        .then(function(resp) {
          $scope.user = null;
        })
        .catch(function(resp) {
          // TODO: Proper error handling
          console.log(resp);
        });
    };
  });
