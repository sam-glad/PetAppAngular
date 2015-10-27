'use strict';

angular.module('petApp')
  .directive('sgForm', function () {
    return {
        restrict: 'EA',
        scope: {
            submittable: '=',
            applicationFormId: '=',
            type: '='
        },
        templateUrl: '/../templates/sgForm.html',
        controller: 'SgFormCtrl',
        link: function ($scope, element, attrs) { }
    }
});
