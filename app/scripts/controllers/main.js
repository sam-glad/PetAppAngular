'use strict';

angular.module('petApp')
  .controller('MainCtrl', function ($scope, $rootScope, User) {
    if ($rootScope.user.id && typeof($rootScope.user) !== 'User') {
      $rootScope.user = User.build($rootScope.user);
    }

    $scope.showMyOrganizations = function(user) {
      return (user.id && user.adminOrganizations.length > 0);
    };
  });
