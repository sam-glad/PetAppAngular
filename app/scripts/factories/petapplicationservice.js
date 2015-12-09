'use strict';

angular.module('petApp')
  .factory('petApplicationService', function(Restangular, PetApplication, UtilsService) {
    var service = {
      getPetApplication: getPetApplication,
      postPetApplication: postPetApplication,
      getPetApplicationsByOrganizationId: getPetApplicationsByOrganizationId,
      putPetApplication: putPetApplication
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

    function putPetApplication(petApplication) {
      var putResource = Restangular.one('pet_applications', petApplication.id);
      petApplication.transformBeforeSave();
      putResource.pet_application = petApplication;
      putResource.put();
    };

    return service;

  });
