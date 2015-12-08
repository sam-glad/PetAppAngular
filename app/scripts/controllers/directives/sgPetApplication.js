'use strict';

angular.module('petApp')
  .controller('SgPetApplicationCtrl', function ($scope) {
    if (typeof $scope.petApplication !== 'undefined') {
      $scope.petApplication.transformForDirective();  
    }
  });
