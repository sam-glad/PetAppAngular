'use strict';

angular.module('petApp')
  .controller('ApplicationFormsShowCtrl', function ($scope, $routeParams,
    ApplicationForm, FORM_QUESTION_TYPES) {
      $scope.showAnswers = false;

      $scope.applicationForm = ApplicationForm.get({id: $routeParams.id}, function(formData) {
        $scope.testFormData = {
          questions: formData.questions
        };

        $scope.testFormData.questions.forEach(function (question) {
          if (question.input_type !== 4) {
            question.answersGiven = [{}]; // Only one answer which needs a body attribute
          }
          else {
            question.answersGiven = []; // Any number of answers for checkboxes
          }
        });
      });

      $scope.formQuestionTypes = FORM_QUESTION_TYPES;

    $scope.toggleCheckBoxAnswer = function toggleCheckBoxAnswer(questionIndex, answer) {
      var answersSelected = $scope.testFormData.questions[questionIndex].answersGiven;

      var index = answersSelected.map(function(x) {
        return x.body; }
      ).indexOf(answer.body);

      if (index !== -1) {
        answersSelected.splice(index, 1);
      }
      else {
        answersSelected.push( { body: answer.body } );
      }
    };

    $scope.submitTestForm = function() {
      if ($scope.testForm.$valid) {
        $scope.showAnswers = true;
      }
    };
  });
