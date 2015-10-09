'use strict';

angular.module('petApp')
  .controller('PetsShowCtrl', function ($scope, $routeParams, Pet, UtilsService) {

    // Setup

    Pet.get({id: $routeParams.id}, function(pet) {
      $scope.pet = pet
    });

    $scope.Utils = UtilsService;
  });
