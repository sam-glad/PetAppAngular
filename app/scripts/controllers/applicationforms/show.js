'use strict';

angular.module('petApp')
  .controller('ApplicationFormsShowCtrl', function ($scope, $routeParams,
    applicationFormService, applicationFormsPrepService, CRUD_ACTIONS, UtilsService) {
    $scope.applicationForm = applicationFormsPrepService;
    $scope.isEditFormVisible = false;
    $scope.editToggleButtonText = 'Edit Form';
    $scope.crudActions = CRUD_ACTIONS;

    $scope.toggleShowEditForm = function(applicationForm, isEditFormVisible) {
      UtilsService.orderQuestions(applicationForm.questions);
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
