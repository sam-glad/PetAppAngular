'use strict';

angular.module('petApp')
  .factory('petApplicationService', function(Restangular, PetApplication, UtilsService, PET_APPLICATION_STATUSES) {
    var service = {
      getPetApplication: getPetApplication,
      postPetApplication: postPetApplication,
      getPetApplicationsByOrganizationId: getPetApplicationsByOrganizationId,
      getAdminPetApplications: getAdminPetApplications,
      getPendingAdminPetApplications: getPendingAdminPetApplications,
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

    function getAdminPetApplications(userId) {
      return Restangular
        .service('admin_pet_applications', Restangular.one('users', userId))
          .getList().then(function(responseData) {
            return UtilsService.buildModelsFromResponse(responseData, PetApplication);
          });
    }

    function getPendingAdminPetApplications(userId) {
      return Restangular
        .service('admin_pet_applications', Restangular.one('users', userId))
          .getList({status: PET_APPLICATION_STATUSES.pending.id}).then(function(responseData) {
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
