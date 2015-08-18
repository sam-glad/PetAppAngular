'use strict';

/**
 * @ngdoc function
 * @name petAppAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the petAppAngularApp
 */
angular.module('petAppAngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
