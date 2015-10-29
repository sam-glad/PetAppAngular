'use strict';

angular.module('petApp')
  .directive('sgForm', function () {
    return {
        restrict: 'EA',
        scope: {
            submittable: '=',
            applicationFormId: '=',
            applicationType: '='
        },
        templateUrl: '/../templates/sgForm.html',
        controller: 'SgFormCtrl'
    }
});
