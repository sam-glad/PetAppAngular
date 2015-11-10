'use strict';

angular.module('petApp')
  .factory('petService', function(Restangular) {
    var service = {
      getPets: getPets,
      getPet: getPet,
      patchPet: patchPet
    };

    var resource = Restangular.all('pets');

    function getPets() {
      return resource.getList();
    }

    function getPet(petId) {
      return Restangular.one('pets', petId).get();
    }

    function patchPet(pet) {
      var putResource = Restangular.one('pets', pet.id);
      putResource.pet = pet;

      putResource.put();
    };

    return service;
  });
