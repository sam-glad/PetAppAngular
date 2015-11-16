'use strict';

angular.module('petApp')
  .controller('SgFormBuilderCtrl', function ($scope, $window, $location,
    $timeout, $anchorScroll, applicationFormService, FORM_QUESTION_TYPES) {
    function Answer() {
      this.body = '';
    }

    function Question() {
      this.body = '';
      this.input_type = '';
      this.is_required = false;
      this.answers_attributes = [new Answer()];
    }

    // Initialize form

    if (typeof $scope.applicationForm === 'undefined') {
      $scope.applicationForm = {};
      $scope.applicationForm.questions_attributes = [new Question()];
    }

    $scope.formQuestionTypes = FORM_QUESTION_TYPES;

    // Called from form

    $scope.typeRequiresAnswer = function (question) {
      return !(question.input_type === FORM_QUESTION_TYPES.smallTextbox.id ||
               question.input_type === FORM_QUESTION_TYPES.largeTextbox.id);
    };

    $scope.scrollTo = function(id) {
      $timeout(function() {
        $location.hash(id);
        $anchorScroll();
        $location.hash('');
      });
    }

    $scope.addQuestion = function () {
      $scope.applicationForm.questions_attributes.push(new Question());
      $scope.scrollTo('bottom');
    };

    $scope.addAnswer = function (questionIndex) {
      var answers = $scope.applicationForm.questions_attributes[questionIndex].answers_attributes;
      answers.push(new Answer());
      $scope.scrollTo('bottom-question-index-' + questionIndex + '-answer-index-' + (answers.length - 1));
    };

    $scope.deleteQuestion = function(questionIndex) {
      if ($scope.applicationForm.questions_attributes.length > 1) {
        $scope.applicationForm.questions_attributes.splice(questionIndex, 1);
      }
    };

    $scope.deleteAnswer = function(question, answerIndex) {
      if (question.answers_attributes.length > 1) {
        question.answers_attributes.splice(answerIndex, 1);
      }
    };

    $scope.createApplicationForm = function(isValid) {
      if (isValid) {
        $scope.transformBeforeSave();

        applicationFormService.postApplicationForm({ applicationForm: $scope.applicationForm});
      }
    };

    // Helpers

    $scope.clearBlanks = function() {
      $scope.applicationForm.questions_attributes.forEach(function (question) {
        if ($scope.typeRequiresAnswer(question)) {
          question.answers_attributes = [];
        }
      });
    };

    $scope.transformBeforeSave = function() {
      $scope.clearBlanks();
    };
  });
