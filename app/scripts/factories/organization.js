'use strict';

angular.module('petApp')
  .factory('organizationService', function(Restangular) {
    var service = {
      getOrganizations: getOrganizations,
      getOrganization: getOrganization
    };

    function getOrganizations(){
      return Restangular.all('organizations').getList();
    }

    function getOrganization(organizationId){
      return Restangular.one('organizations', organizationId).get();
    }

    return service;
  });
