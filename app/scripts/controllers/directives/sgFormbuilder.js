'use strict';

angular.module('petApp')
  .controller('SgFormBuilderCtrl', function ($scope, $window, $location,
    $timeout, $anchorScroll, applicationFormService, FORM_QUESTION_TYPES,
    CRUD_ACTIONS) {

    $scope.formQuestionTypes = FORM_QUESTION_TYPES;
    $scope.crudActions = CRUD_ACTIONS;

    function Answer() {
      this.body = '';
    }

    function Question() {
      this.body = '';
      this.input_type = '';
      this.is_required = false;
      this.answers = [new Answer()];
    }

    // Initialize form

    if (typeof $scope.applicationForm === 'undefined') {
      $scope.applicationForm = {};
      $scope.applicationForm.questions = [new Question()];
    }

    setSubmitButtonText($scope.action);

    function setSubmitButtonText(action) {
      switch (action) {
        case CRUD_ACTIONS.create:
          $scope.submitButtonText = 'Create Form';
          break;

        case CRUD_ACTIONS.update:
          $scope.submitButtonText = 'Update Form';
          break;
      }
    }

    // Called from form

    $scope.typeRequiresAnswer = function (question) {
      return !(question.input_type === FORM_QUESTION_TYPES.smallTextbox.id ||
               question.input_type === FORM_QUESTION_TYPES.largeTextbox.id);
    };

    function scrollTo(id) {
      $timeout(function() {
        $location.hash(id);
        $anchorScroll();
        $location.hash('');
      });
    }

    $scope.addQuestion = function () {
      $scope.applicationForm.questions.push(new Question());
      scrollTo('bottom');
    };

    $scope.addAnswer = function (questionIndex) {
      var answers = $scope.applicationForm.questions[questionIndex].answers;
      answers.push(new Answer());
      scrollTo('bottom-question-index-' + questionIndex + '-answer-index-' + (answers.length - 1));
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

    // Submit

    $scope.submit = function(isValid, action, applicationForm) {
      if (isValid) {
        transformBeforeSave(applicationForm);

        switch (action) {
          case CRUD_ACTIONS.create:
            applicationFormService.postApplicationForm({ application_form: applicationForm});
            break;

          case CRUD_ACTIONS.update:
            applicationFormService.putApplicationForm(applicationForm);
            break;
        }
      }
    };

    // Helpers

    function clearBlanks(applicationForm) {
      applicationForm.questions_attributes.forEach(function (question) {
        if (!$scope.typeRequiresAnswer(question)) {
          question.answers_attributes = [];
        }
      });
    }

    function transformBeforeSave(applicationForm) {
      applicationForm.questions_attributes = applicationForm.questions;
      applicationForm.questions_attributes.forEach(function (question) {
        question.answers_attributes = question.answers;
      });
      clearBlanks(applicationForm);
    }
  });
