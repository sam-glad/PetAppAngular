'use strict';

angular.module('petApp')
  .controller('PetApplicationsIndexCtrl', function ($scope, $routeParams,
    petApplicationService, PET_APPLICATION_STATUSES) {
      petApplicationService.getPetApplicationsByOrganizationId($routeParams.id)
        .then(function(petApplications) {
          $scope.petApplications = petApplications;
        });

      $scope.statusAsString = function(statusAsInteger) {
        for (var statusType in PET_APPLICATION_STATUSES) {
          if (PET_APPLICATION_STATUSES[statusType].id === statusAsInteger) {
            return PET_APPLICATION_STATUSES[statusType].name;
          }
        }
      }
  });
