'use strict';

angular.module('petApp')
  .controller('ApplicationFormsNewCtrl', function ($scope, applicationFormsService) {
    function Answer() {
      this.body = '';
    }

    function Question() {
      this.body = '';
      this.answers_attributes = [new Answer()];
      this.type = 'Small Text Box';
    }

    // Initialize form
    $scope.application_form = {};
    $scope.application_form.questions_attributes = [new Question()];
    $scope.questionTypes = ['Small Text Box', 'Large Text Box', 'Radio',
      'Dropdown', 'Checkbox'];

    // Methods called from form
    $scope.addQuestion = function () {
      $scope.application_form.questions_attributes.push(new Question());
    };

    $scope.addAnswer = function (index) {
      $scope.application_form.questions_attributes[index].answers_attributes.push(new Answer());
    };

    $scope.deleteQuestion = function(questionIndex) {
      if ($scope.application_form.questions_attributes.length > 1) {
        $scope.application_form.questions_attributes.splice(questionIndex, 1);
      }
    };

    $scope.deleteAnswer = function(question, answerIndex) {
      if (question.answers_attributes.length > 1) {
        question.answers_attributes.splice(answerIndex, 1);
      }
    };

    $scope.answerRequired = function(question) {
      return ['Small Text Box', 'Large Text Box'].indexOf(question.type) === -1;
    };

    $scope.createApplicationForm = function() {
      // $scope.clearBlankAnswers($scope.application_form.questions_attributes);
      $scope.application_form.name = 'My first application form';
      $scope.transformBeforeSave();
      applicationFormsService.applicationForms.new( { application_form: $scope.application_form });
    };

    // Helpers
    $scope.clearBlankAnswers = function(questions) {
      $scope.application_form.questions_attributes.forEach(function (question) {
        for (var i = 0; i < question.answers_attributes.length; i++) {
          if (question.type != 'Text Input' && !question.answers_attributes[i]) {
            question.answers_attributes.splice(i, 1);
          }
        }
      });
    };

    $scope.transformBeforeSave = function() {
      // $scope.application_form.questions_attributes_attributes = $scope.application_form.questions_attributes;
      $scope.application_form.questions_attributes.forEach(function (question) {
        question.answers_attributes = question.answers;
      });
    };
  });
