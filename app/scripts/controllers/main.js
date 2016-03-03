'use strict';

angular.module('petApp')
  .controller('MainCtrl', function ($scope, $rootScope, User, petApplicationService) {
    if ($rootScope.user.id && $rootScope.user.adminOrganizations.length > 0) {
      petApplicationService.getAdminPetApplications($rootScope.user.id)
        .then(function (petApplications) {
          $scope.petApplications = petApplications;
        });
    }

    $scope.showMyOrganizations = function(user) {
      return (user.id && user.adminOrganizations.length > 0);
    };
  });
