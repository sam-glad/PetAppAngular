'use strict';

angular.module('petApp')
  .directive('sgFormBuilder', function () {
    return {
        restrict: 'EA',
        scope: {
            applicationForm: '=',
            action: '='
        },
        templateUrl: '/../templates/sgFormBuilder.html',
        controller: 'SgFormBuilderCtrl'
    }
});
