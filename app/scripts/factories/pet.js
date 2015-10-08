'use strict';

angular.module('petApp')
  .factory('Pet', function($resource, RESOURCES) {
    return $resource(RESOURCES.PETS_API);
  });
