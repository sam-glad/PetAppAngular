'use strict';

angular.module('petApp')
  .directive('sgFormBuilder', function () {
    return {
        restrict: 'EA',
        scope: {
            applicationForm: '='
        },
        templateUrl: '/../templates/sgFormBuilder.html',
        controller: 'SgFormBuilderCtrl'
    }
});
