'use strict';

angular.module('petApp')
  .factory('UtilsService', function() {
    return {
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

      displayLocation: function(organization) {
        return organization.city + ', ' + organization.state_province;
      },

      displayDate: function(date) {
        return moment(date).toDate().toString();
      }
    };
  });
