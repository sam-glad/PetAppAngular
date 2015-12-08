'use strict';

angular.module('petApp')
  .factory('petService', function(Restangular, Pet, UtilsService) {
    var service = {
      getPets: getPets,
      getPet: getPet,
      putPet: putPet
    };

    function getPets() {
      return Restangular.all('pets').getList().then(function(responseData) {
        return UtilsService.buildModelsFromResponse(responseData, Pet);
      });
    }

    function getPet(petId) {
      return Restangular.one('pets', petId).get().then(function(responseData) {
        return UtilsService.buildModelsFromResponse(responseData, Pet);
      });
    }

    function putPet(pet) {
      var putResource = Restangular.one('pets', pet.id);
      putResource.pet = pet;
      putResource.put();
    };

    return service;
  });
