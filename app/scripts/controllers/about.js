'use strict';

/**
 * @ngdoc function
 * @name AngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the AngularApp
 */
angular.module('AngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
