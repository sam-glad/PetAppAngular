'use strict';

angular.module('petApp')
  .controller('ApplicationFormsShowCtrl', function ($scope, $routeParams,
    applicationFormService, applicationFormsPrepService) {
    $scope.applicationForm = applicationFormsPrepService;
    $scope.isEditFormVisible = false;
    $scope.editToggleButtonText = 'Edit Form';

    $scope.toggleShowEditForm = function(isEditFormVisible) {
      $scope.isEditFormVisible = !isEditFormVisible;

      switch($scope.isEditFormVisible) {
        case true:
          $scope.editToggleButtonText = 'Show Form';
          break;
        case false:
          $scope.editToggleButtonText = 'Edit Form';
          break;
      }
    };
  });
