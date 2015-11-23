'use strict';

angular.module('petApp')
  .factory('petApplicationService', function(Restangular) {
    var service = {
      getPetApplication: getPetApplication,
      postPetApplication: postPetApplication,
      getPetApplicationsByOrganizationId: getPetApplicationsByOrganizationId
    };

    var resource = Restangular.all('pet_applications');

    function getPetApplicationsByOrganizationId(organizationId) {
      return Restangular
        .service('pet_applications', Restangular.one('organizations', organizationId))
          .getList();
    }

    function getPetApplication(petApplicationId) {
      return Restangular.one('pet_applications', petApplicationId).get();
    }

    function postPetApplication(petApplication) {
      return resource.post(petApplication);
    }

    return service;

  });
