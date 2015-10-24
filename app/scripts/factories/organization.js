'use strict';

angular.module('petApp')
  .factory('Organization', function($resource, RESOURCES) {
    return $resource(RESOURCES.ORGANIZATIONS_API + '/:id');
  });
