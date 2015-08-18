'use strict';

/**
 * @ngdoc function
 * @name AngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the AngularApp
 */
angular.module('AngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
