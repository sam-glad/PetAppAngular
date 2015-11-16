'use strict';

angular.module('petApp')
  .controller('ApplicationFormsNewCtrl', function ($scope, CRUD_ACTIONS) {
    $scope.crudActions = CRUD_ACTIONS;
  });
