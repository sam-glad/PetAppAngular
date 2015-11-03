'use strict';

angular.module('petApp')
  .controller('PetsShowCtrl', function ($scope, $routeParams, Pet, Organization,
    UtilsService, APPLICATION_TYPES) {

    // Setup

    Pet.get({id: $routeParams.id}, function(pet) {
      $scope.pet = pet;
      Organization.get({id: $scope.pet.organization_id}, function(organization) {
        $scope.pet.organization = organization;
      });
    });

    $scope.Utils = UtilsService;
    $scope.isAdoptionFormVisible = false;
    $scope.isFosterFormVisible = false;
    $scope.applicationTypes = APPLICATION_TYPES;

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

    $scope.isAdoptable = function(pet) {
      return pet.is_adoptable && pet.adoption_application_id;
    };

    $scope.isFosterable = function(pet) {
      return pet.is_fosterable && pet.foster_application_id;
    };
  });
