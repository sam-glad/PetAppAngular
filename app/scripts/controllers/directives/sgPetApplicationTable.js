'use strict';

angular.module('petApp')
  .controller('SgPetApplicationTableCtrl', function ($scope, UtilsService, petApplicationService) {
    // Setup
    var vm = this;
    $scope.Utils = UtilsService;

    // Showing all pending applications for organizations
    // in which the current user is an admin
    if (vm.showAdminApplications && vm.user.id && vm.user.adminOrganizations.length > 0) {
      petApplicationService.getPendingAdminPetApplications(vm.user.id)
        .then(function (petApplications) {
          $scope.petApplications = petApplications;
        });
    }
    // Showing all pet applications for an organization's pets
    else {
      if (vm.organization) {
        petApplicationService.getPetApplicationsByOrganizationId(vm.organization.id)
          .then(function(petApplications) {
            $scope.petApplications = petApplications;
          });
      }
    }
  });
