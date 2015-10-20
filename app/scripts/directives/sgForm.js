'use strict';

angular.module('petApp')
  .directive('sgForm', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'
        },
        templateUrl: '/../templates/sgForm.html',
        controller: 'SgFormCtrl',
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
});
