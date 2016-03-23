'use strict';

angular.module('petApp')
  .directive('sgPetApplication', function () {
    return {
      bindToController: true,
      controllerAs: 'vm',
      controller: 'SgPetApplicationCtrl',
      restrict: 'E',
      scope: {
          petApplication: '='
      },
      templateUrl: '/../templates/sgPetApplication.html'
    }
});
