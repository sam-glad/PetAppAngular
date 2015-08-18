'use strict';

/**
 * @ngdoc function
 * @name petAppAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the petAppAngularApp
 */
angular.module('petAppAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
