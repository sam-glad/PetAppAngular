'use strict';

angular.module('petApp')
  .factory('PetApplication', function($resource, RESOURCES) {
    return $resource(RESOURCES.PET_APPLICATIONS_API + '/:id');
  });
