'use strict';

angular.module('petApp')
  .controller('MainCtrl', function ($scope, $rootScope, User, UtilsService, PET_APPLICATION_STATUSES, petApplicationService) {
    $scope.Utils = UtilsService;
    if ($scope.user.id && $scope.user.adminOrganizations.length > 0) {
      petApplicationService.getPendingAdminPetApplications($scope.user.id)
        .then(function (petApplications) {
          $scope.petApplications = petApplications;
        });
    }

    $scope.showMyOrganizations = function(user) {
      return (user.id && user.adminOrganizations.length > 0);
    };
  });
