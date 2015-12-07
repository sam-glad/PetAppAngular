'use strict';

angular.module('petApp')
  .factory('organizationService', function(Restangular, Organization, UtilsService) {
    var service = {
      getOrganizations: getOrganizations,
      getOrganization: getOrganization
    };

    function getOrganizations() {
      return Restangular.all('organizations').getList().then(function(responseData) {
        return UtilsService.buildModelsFromResponse(responseData, Organization);
      });
    }

    function getOrganization(organizationId) {
      return Restangular.one('organizations', organizationId).get().then(function(responseData) {
        return UtilsService.buildModelsFromResponse(responseData, Organization);
      });
    }

    return service;
  });
