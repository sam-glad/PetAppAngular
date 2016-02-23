'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, organizationService) {

    organizationService.getOrganizations().then(function (organizations) {
      $scope.organizations = organizations;
    });
  });
