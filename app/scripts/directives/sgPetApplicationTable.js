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
        organization: '='
      },
      templateUrl: '/../templates/sgPetApplicationTable.html'
    }
});
