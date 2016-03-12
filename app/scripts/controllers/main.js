'use strict';

angular.module('petApp')
  .controller('MainCtrl', function ($scope, $rootScope, User, UtilsService, PET_APPLICATION_STATUSES, petApplicationService) {
    if ($rootScope.user.id && $rootScope.user.adminOrganizations.length > 0) {
      petApplicationService.getAdminPetApplications($rootScope.user.id)
        .then(function (petApplications) {
          $scope.Utils = UtilsService;
          $scope.petApplications = petApplications;
        });
    }

    $scope.showMyOrganizations = function(user) {
      return (user.id && user.adminOrganizations.length > 0);
    };
  });
