'use strict';

angular.module('petApp')
  .controller('PetApplicationsIndexCtrl', function ($scope, $routeParams,
    petApplicationService, UtilsService, PET_APPLICATION_STATUSES) {
      $scope.organizationId = $routeParams.id;
      // $scope.Utils = UtilsService;
      //
      // petApplicationService.getPetApplicationsByOrganizationId($routeParams.id)
      //   .then(function(petApplications) {
      //     $scope.petApplications = petApplications;
      //   });
  });
