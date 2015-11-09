'use strict';

angular.module('petApp')
  .controller('PetsShowCtrl', function ($scope, $routeParams, petService,
    applicationFormService, organizationService, UtilsService,
    APPLICATION_TYPES) {

    // Setup

    $scope.isAdoptionFormVisible = false;
    $scope.isFosterFormVisible = false;
    $scope.isEditFormVisible = false;
    $scope.applicationTypes = APPLICATION_TYPES;

    petService.getPet($routeParams.id).then(function(pet) {
      $scope.pet = pet;
      organizationService.getOrganization($scope.pet.organization_id).then(function(organization) {
        $scope.pet.organization = organization;
        // TODO: Get application forms by organization
      });

      $scope.Utils = UtilsService;
    });

    // Called from page

    $scope.showForm = function (applicationType) {
      switch (applicationType) {
        case APPLICATION_TYPES.adoption.id:
          $scope.isAdoptionFormVisible = true;
        break;

        case APPLICATION_TYPES.foster.id:
          $scope.isFosterFormVisible = true;
        break;
      }
    };

    $scope.showEditForm = function() {
      $scope.isEditFormVisible = true;
    };

    $scope.isAdoptable = function(pet) {
      return pet.is_adoptable && pet.adoption_application_id;
    };

    $scope.isFosterable = function(pet) {
      return pet.is_fosterable && pet.foster_application_id;
    };
  });
