'use strict';

angular.module('petApp')
  .controller('SgFormBuilderCtrl', function ($scope, $window, $route, ApplicationForm,
    applicationFormService, UtilsService, FORM_QUESTION_TYPES, CRUD_ACTIONS, REGEX) {

    // Called from form

    $scope.addQuestion = function (applicationForm) {
      applicationForm.addBlankQuestion();
      UtilsService.scrollTo('bottom');
    };

    $scope.addAnswer = function (applicationForm, questionIndex) {
      var question = applicationForm.questions[questionIndex];
      question.addBlankAnswer();
      UtilsService.scrollTo('bottom-question-index-' + questionIndex + '-answer-index-' + (question.answers.length - 1));
    };

    // Initialize form

    $scope.deletedQuestions = [];
    $scope.formQuestionTypes = FORM_QUESTION_TYPES;
    $scope.crudActions = CRUD_ACTIONS;
    $scope.integers = REGEX.integers;

    if (typeof $scope.applicationForm === 'undefined') {
      $scope.applicationForm = ApplicationForm.buildBlank();
    }

    setSubmitButtonText($scope.action);

    // Submit

    $scope.submit = function(isValid, action, applicationForm, deletedQuestions) {
      if (isValid) {
        applicationForm = transformBeforeSave(applicationForm, deletedQuestions);

        switch (action) {
          case CRUD_ACTIONS.create:
            applicationFormService.postApplicationForm({ application_form: applicationForm})
              .then(function(response) {
                $window.location.href = '/#/applicationforms/' + response.id;
              });
              // TODO: Handle error (flash notice)
            break;

          case CRUD_ACTIONS.update:
            applicationFormService.putApplicationForm(applicationForm).then(function(response) {
              $route.reload();
              // TODO: Flash notice indicating success
            });
              // TODO: Handle error (flash notice)
            break;
        }
      }
    };

    // Helpers

    function transformBeforeSave(applicationForm, deletedQuestions) {
      applicationForm.orderQuestions();
      clearBlanks(applicationForm.questions);
      applicationForm.questions_attributes = applicationForm.questions;
      applicationForm.questions_attributes.forEach(function (question) {
        question.answers_attributes = question.answers;
        question.answers_attributes = question.answers_attributes.concat(question.deletedAnswers);
      });
      applicationForm.questions_attributes = applicationForm.questions_attributes.concat(deletedQuestions); // Ensure pre-existing questions are deleted
      return applicationForm;
    }

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
  });
