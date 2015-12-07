'use strict';

angular.module('petApp')
  .controller('PetsShowCtrl', function ($scope, $routeParams, petService,
    applicationFormService, organizationService, UtilsService, petPrep,
    APPLICATION_TYPES) {

    // Setup

    $scope.pet = petPrep;
    $scope.isAdoptionFormVisible = false;
    $scope.isFosterFormVisible = false;
    $scope.isEditFormVisible = false;
    $scope.applicationTypes = APPLICATION_TYPES;

    // TODO: if (user has the right privileges to see edit form)
    applicationFormService.getApplicationFormsByOrganizationId($scope.pet.organization_id).then(function(applicationForms) {
      $scope.organizationForms = applicationForms;
    });

    $scope.Utils = UtilsService;

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

    // Submit

    $scope.submit = function(pet) {
      petService.patchPet(pet);
    };
  });
