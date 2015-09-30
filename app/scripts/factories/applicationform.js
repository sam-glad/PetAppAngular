'use strict';

angular.module('petApp')
  .factory('ApplicationForm', function($resource, RESOURCES) {
    return $resource(RESOURCES.APPLICATION_FORMS_API + '/:id');
  });
