'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, organizationsService) {
      $scope.organizations = organizationsService.organizations.query();

      $scope.getContactInfo = function(organization) {
        return organization.phone_preferred ?
          organization.phone_number.toString() + organization.phone_extension :
          organization.email_address
      };
  });
