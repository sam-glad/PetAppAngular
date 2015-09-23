'use strict';

angular.module('petApp')
  .controller('ApplicationFormsNewCtrl', function ($scope) {
    $scope.applicationForm = {};

    // Initialize question with an empty answer
    // so as to be able to push more answers later
    $scope.applicationForm.questions = [
      {
        body: '',
        placeholder: 'Type a question here',
        answers: [
          {
            body: ''
          }
        ]
      }
    ];

    $scope.addQuestion = function () {
      $scope.applicationForm.questions.push({
        body: '',
        placeholder: 'Type a question here',
        answers: [
          {
            body: ''
          }
        ]
      });
    };

    $scope.addAnswer = function (index) {
      $scope.applicationForm.questions[index].answers.push({
        body: ''
      });
    };

    $scope.createApplicationForm = function() {
      debugger;
      // TODO: Create service, call create method from here with VM as param
    };
  });
