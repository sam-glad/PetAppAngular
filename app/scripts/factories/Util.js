'use strict';

angular.module('petApp')
  .factory('UtilsService', function($location, $timeout, $anchorScroll) {
    return {
      buildModelsFromResponse: function (responseData, modelType) {
        if (angular.isArray(responseData)) {
          return responseData
            .map(modelType.build)
            .filter(Boolean);
        }
        return modelType.build(responseData);
      },

      displayBreeds: function(pet) {
        if (!pet.breeds.length > 1) {
          return pet.breeds[0].name;
        }

        var output = '';
        pet.breeds.forEach(function(breed) {
          output += ' ' + breed.name;
        });

        return output += ' mix';
      },

      displayDate: function(date) {
        return moment(date).toDate().toString();
      },

      sortByKey: function(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
      },

      scrollTo: function(id) {
        $timeout(function() {
          $location.hash(id);
          $anchorScroll();
          $location.hash('');
        });
      }
    };
  });
