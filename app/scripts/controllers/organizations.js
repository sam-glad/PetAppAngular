'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, organizationsService) {
      $scope.organizations = organizationsService.getAllOrganizations();
  });
