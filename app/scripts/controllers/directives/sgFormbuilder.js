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
      this.typeRequiresAnswer = function () {
        return !(this.input_type === FORM_QUESTION_TYPES.smallTextbox.id ||
                 this.input_type === FORM_QUESTION_TYPES.largeTextbox.id);
      };
    }

    // Initialize form

    $scope.application_form = {};
    $scope.application_form.questions_attributes = [new Question()];
    $scope.formQuestionTypes = FORM_QUESTION_TYPES;

    // Called from form

    $scope.scrollTo = function(id) {
      $timeout(function() {
        $location.hash(id);
        $anchorScroll();
        $location.hash('');
      });
    }

    $scope.addQuestion = function () {
      $scope.application_form.questions_attributes.push(new Question());
      $scope.scrollTo('bottom');
    };

    $scope.addAnswer = function (questionIndex) {
      var answers = $scope.application_form.questions_attributes[questionIndex].answers_attributes;
      answers.push(new Answer());
      $scope.scrollTo('bottom-question-index-' + questionIndex + '-answer-index-' + (answers.length - 1));
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

    $scope.createApplicationForm = function(isValid) {
      if (isValid) {
        $scope.transformBeforeSave();

        applicationFormService.postApplicationForm({ application_form: $scope.application_form});
      }
    };

    // Helpers

    $scope.clearBlanks = function() {
      $scope.application_form.questions_attributes.forEach(function (question) {
        if (!question.typeRequiresAnswer()) {
          question.answers_attributes = [];
        }
      });
    };

    $scope.transformBeforeSave = function() {
      $scope.clearBlanks();
    };
  });
