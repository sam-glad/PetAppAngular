'use strict';

angular.module('petApp')
  .controller('ApplicationFormsNewCtrl', function ($scope) {
    function Answer() {
      this.body = '';
      this.type = 'Text Input'
    }

    function Question() {
      this.body = '';
      this.answers = [new Answer()]
    }

    // Initialize form
    $scope.applicationForm = {};
    $scope.applicationForm.questions = [new Question()];

    // Methods called from form
    $scope.addQuestion = function () {
      $scope.applicationForm.questions.push(new Question());
    };
    $scope.addAnswer = function (index) {
      $scope.applicationForm.questions[index].answers.push(new Answer());
    };
    $scope.deleteQuestion = function(questionIndex) {
      if ($scope.applicationForm.questions.length > 1) {
        $scope.applicationForm.questions.splice(questionIndex, 1);
      }
    };
    $scope.deleteAnswer = function(question, answerIndex) {
      if (question.answers.length > 1) {
        question.answers.splice(answerIndex, 1);
      }
    };

    $scope.createApplicationForm = function() {
      $scope.clearBlankAnswers($scope.applicationForm.questions);
      debugger;
      // TODO: Create service, call create method from here with VM as param
    };

    // Helpers
    $scope.clearBlankAnswers = function(questions) {
      $scope.applicationForm.questions.forEach(function (question) {
        for (var i = 0; i < question.answers.length; i++) {
          if (question.type != 'Text Input' && !question.answers[i]) {
            question.answers.splice(i, 1);
          }
        }
      });
    };
  });
