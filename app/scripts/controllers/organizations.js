'use strict';

angular.module('petApp')
  .controller('OrganizationsCtrl', function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'http://localhost:9393/organizations',
        dataType: 'JSONP'
      })
      .success(function (response) {
      $scope.organizations = response;
    });
  });
