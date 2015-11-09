'use strict';

angular.module('petApp')
  .factory('petService', function(Restangular) {
    var service = {
      getPets: getPets,
      getPet: getPet
    };

    function getPets() {
      return Restangular.all('pets').getList();
    }

    function getPet(petId) {
      return Restangular.one('pets', petId).get();
    }

    return service;
  });
