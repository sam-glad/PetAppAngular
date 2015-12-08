'use strict';

angular.module('petApp')
  .factory('petApplicationService', function(Restangular, PetApplication, UtilsService) {
    var service = {
      getPetApplication: getPetApplication,
      postPetApplication: postPetApplication,
      getPetApplicationsByOrganizationId: getPetApplicationsByOrganizationId
    };

    var resource = Restangular.all('pet_applications');

    function getPetApplicationsByOrganizationId(organizationId) {
      return Restangular
        .service('pet_applications', Restangular.one('organizations', organizationId))
          .getList().then(function(responseData) {
            return UtilsService.buildModelsFromResponse(responseData, PetApplication);
          });
    }

    function getPetApplication(petApplicationId) {
      return Restangular.one('pet_applications', petApplicationId).get()
        .then(function(responseData) {
          return UtilsService.buildModelsFromResponse(responseData, PetApplication);
        });
    }

    function postPetApplication(petApplication) {
      return resource.post(petApplication);
    }

    return service;

  });
