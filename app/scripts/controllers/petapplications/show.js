'use strict';

angular.module('petApp')
  .controller('PetApplicationShowCtrl', function ($scope, petApplicationsPrepService) {
    $scope.petApplication = petApplicationsPrepService;
  });
