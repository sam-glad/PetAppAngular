'use strict';

angular.module('petApp')
  .controller('MainCtrl', function ($scope, UtilsService, petApplicationService) {
    $scope.Utils = UtilsService;

    $scope.showMyOrganizations = function(user) {
      return (user.id && user.adminOrganizations.length > 0);
    };
  });
