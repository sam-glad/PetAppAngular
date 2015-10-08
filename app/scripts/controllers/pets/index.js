'use strict';

angular.module('petApp')
  .controller('PetsIndexCtrl', function ($scope, Pet) {
      Pet.query().$promise.then(function(data) {
        $scope.pets = data
      },
      function(error) {
        console.log(error) // TODO: Proper error handling
      });

      // Called from page

      $scope.displayBreeds = function(pet) {
        if (!pet.is_mix) {
          return pet.breeds[0].name;
        }

        var output = '';
        pet.breeds.forEach(function(breed) {
          output += ' ' + breed.name;
        });

        return output += ' mix';
      };
  });
