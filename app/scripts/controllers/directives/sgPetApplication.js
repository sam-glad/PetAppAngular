'use strict';

angular.module('petApp')
  .controller('SgPetApplicationCtrl', function ($scope, petApplicationService) {
    if (typeof $scope.petApplication !== 'undefined') {
      vm.petApplication.transformForDirective();
    }

    $scope.approve = function (petApplication) {
      petApplication.approve();
      petApplicationService.putPetApplication(petApplication);
      // TODO: Success/Failure notification
    }

    $scope.deny = function (petApplication) {
      petApplication.deny();
      petApplicationService.putPetApplication(petApplication);
      // TODO: Success/Failure notification
    }
  });
