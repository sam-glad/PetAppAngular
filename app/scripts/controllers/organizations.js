'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, organizationsService) {
      $scope.organizations = organizationsService.getAllOrganizations();

      $scope.getContactInfo = function(organization) {
        if (organization.phone_preferred) {
          return organization.phone_number.toString() + organization.phone_extension;
        }

        return organization.email_address;
      };
  });
