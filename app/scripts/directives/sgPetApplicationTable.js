'use strict';

angular.module('petApp')
  .directive('sgPetApplicationTable', function () {
    return {
      bindToController: true,
      controllerAs: 'vm',
      controller: 'SgPetApplicationTableCtrl',
      restrict: 'E',
      scope: {
        showAdminApplications: '=',
        user: '=',
        organizationId: '='
      },
      templateUrl: '/../templates/sgPetApplicationTable.html'
    }
});
