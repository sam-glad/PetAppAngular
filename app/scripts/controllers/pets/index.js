'use strict';

angular.module('petApp')
  .controller('PetsIndexCtrl', function ($scope, petService, UtilsService) {
    petService.getPets().then(function(pets) {
      $scope.pets = pets;
      $scope.Utils = UtilsService;
    });
  });
