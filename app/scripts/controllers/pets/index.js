'use strict';

angular.module('petApp')
  .controller('PetsIndexCtrl', function ($scope, Pet) {
      Pet.query().$promise.then(function(data) {
        $scope.pets = data
      },
      function(error) {
        console.log(error) // TODO: Proper error handling
      });
  });
