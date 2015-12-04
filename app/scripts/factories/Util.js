'use strict';

angular.module('petApp')
  .factory('UtilsService', function($location, $timeout, $anchorScroll) {
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
      },

      sortByKey: function(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
      },

      orderQuestions: function(questions) {
        questions = UtilsService.sortByKey(questions, 'position');
        for (var i = 0; i < questions.length; i++) {
          questions[i].position = i + 1;
        }
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
