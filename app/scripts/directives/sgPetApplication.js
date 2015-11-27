'use strict';

angular.module('petApp')
  .directive('sgPetApplication', function () {
    return {
        restrict: 'EA',
        scope: {
            petApplication: '='
        },
        templateUrl: '/../templates/sgPetApplication.html',
        controller: 'SgPetApplicationCtrl'
    }
});
