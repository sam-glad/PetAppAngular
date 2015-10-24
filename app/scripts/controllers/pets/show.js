'use strict';

angular.module('petApp')
  .controller('PetsShowCtrl', function ($scope, $routeParams, Pet, Organization,
    ApplicationForm, UtilsService, FORM_QUESTION_TYPES) {

    // Setup

    Pet.get({id: $routeParams.id}, function(pet) {
      $scope.pet = pet;
      Organization.get({id: $scope.pet.organization_id}, function(organization) {
        $scope.pet.organization = organization;
      });
    });

    $scope.Utils = UtilsService;
    $scope.isFormVisible = false;

    // Called from page

    $scope.showForm = function () {
      $scope.isFormVisible = true;
    };
  });
