'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, organizationService, Restangular, UtilsService) {
      organizationService.getOrganizations().then(function (organizations) {
        $scope.organizations = organizations;
      });

      $scope.Utils = UtilsService;

      // Helpers
      $scope.getContactInfo = function(organization) {
        return organization.phone_preferred ?
          organization.phone_number.toString() + organization.phone_extension :
          organization.email_address
      };
  });
