'use strict';

// FIXME: TEMPORARY: Exact copy of controllers/applicationforms/show.js for proof of concept for WIP
angular.module('petApp')
  .controller('SgFormCtrl', function ($scope, $routeParams,
    ApplicationForm, FORM_QUESTION_TYPES) {

    // Setup

    $scope.showAnswers = false;

    $scope.applicationForm = ApplicationForm.get({id: $routeParams.id}, function(formData) {
      $scope.testFormData = {
        questions: formData.questions
      };

      $scope.testFormData.questions.forEach(function (question) {
        if (question.input_type !== FORM_QUESTION_TYPES.checkbox.id) {
          question.answersGiven = [{}]; // Only one answer which needs a body attribute
        }
        else {
          question.answersGiven = []; // Any number of answers for checkboxes
        }
      });
    });

    $scope.formQuestionTypes = FORM_QUESTION_TYPES;

    // Called from form
    $scope.validateCheckbox = function(question, currentForm) {
      if (question.is_required && question.answersGiven.length === 0) {
        currentForm.$setValidity('required', false);
      }
      else {
        currentForm.$setValidity('required', true);
      }
    };

    $scope.toggleCheckBoxAnswer = function toggleCheckBoxAnswer(questionIndex, newAnswer, currentForm) {
      var question = $scope.testFormData.questions[questionIndex];

      var index = question.answersGiven.map(function(answer) {
        return answer.body; }
      ).indexOf(newAnswer.body);

      if (index !== -1) {
        question.answersGiven.splice(index, 1);
      }
      else {
        question.answersGiven.push( { body: newAnswer.body } );
      }

      $scope.validateCheckbox(question, currentForm);
    };

    // Initialize required checkbox subforms as invalid,
    // since they require an answer but none is checked upon loading the page.
    $scope.checkboxFormValidityInit = function (checkboxForm, question) {
      if (question.is_required) {
        checkboxForm.$setValidity('required', false);
      }
    };

    $scope.isBoxChecked = function (checkboxQuestion) {
      if (checkboxQuestion.answersGiven.length === 0) {
        $scope.testForm.checkboxForm.$setValidity('required', false)
        return false;
      }
      $scope.testForm.checkboxForm.$setValidity('required', true)
      return true;
    };

    // Submit

    $scope.submitTestForm = function() {
      if ($scope.testForm.$valid) {
        $scope.showAnswers = true;
      }
    };
  });
