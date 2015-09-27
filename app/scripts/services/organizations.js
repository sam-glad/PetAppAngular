'use strict';

angular.module('petApp')
  .service('organizationsService', function ($resource, RESOURCES) {
    return {
      organizations: $resource(RESOURCES.ORGANIZATIONS_API, {}, {
        query: { method: 'GET', params: {}, isArray: true }
      })
    };
  });
