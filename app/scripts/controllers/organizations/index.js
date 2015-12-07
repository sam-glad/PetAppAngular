'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, organizationService, Restangular, UtilsService) {

    organizationService.getOrganizations().then(function (organizations) {
      $scope.organizations = organizations;
    });
  });
