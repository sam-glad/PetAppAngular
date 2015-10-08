'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, Organization) {
      Organization.query().$promise.then(function(data) {
        $scope.organizations = data
      },
      function(error) {
        console.log(error) // TODO: Proper error handling
      });

      // Helpers
      $scope.getContactInfo = function(organization) {
        return organization.phone_preferred ?
          organization.phone_number.toString() + organization.phone_extension :
          organization.email_address
      };
  });
