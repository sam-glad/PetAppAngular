'use strict';

angular.module('petApp')
  .directive('sgFormBuilder', function () {
    return {
        restrict: 'EA',
        scope: {
            applicationFormId: '='
        },
        templateUrl: '/../templates/sgFormBuilder.html',
        controller: 'SgFormBuilderCtrl'
    }
});
