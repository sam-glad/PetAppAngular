'use strict';

angular.module('petApp')
  .service('organizationsService', function ($resource, $http) {
    var Organization = $resource('http://localhost:9393/organizations');

    this.getAllOrganizations = function() {
      return Organization.query();
    }
  });
