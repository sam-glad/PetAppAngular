'use strict';

angular.module('petApp')
  .service('organizationsService', function ($resource) {
    return {
      organizations: $resource('http://localhost:9393/organizations', {}, {
        query: { method: 'GET', params: {}, isArray: true }
      })
    };
  });
