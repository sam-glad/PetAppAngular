'use strict';

angular.module('petApp')
  .directive('sgForm', function () {
    return {
        bindToController: true,
        controllerAs: 'vm',
        controller: 'SgFormCtrl',
        restrict: 'EA',
        scope: {
            submittable: '=',
            pet: '=',
            applicationForm: '=',
            applicationFormId: '=',
            applicationType: '='
        },
        templateUrl: '/../templates/sgForm.html'
    }
});
