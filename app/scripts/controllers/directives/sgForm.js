'use strict';

angular.module('petApp')
  .controller('SgFormCtrl', function ($scope, $routeParams, $window,
    applicationFormService, petApplicationService, FORM_QUESTION_TYPES, APPLICATION_TYPES) {

    // Setup

    $scope.showAnswers = false;
    $scope.applicationFormId = (typeof applicationId == 'undefined')
                                ? $routeParams.id // Application form show page
                                : applicationId;
    $scope.submitButtonText = $scope.submittable ? 'Submit' : 'Test Submit';

    $scope.applicationForm = applicationFormService.getApplicationForm($scope.applicationFormId).then(function(applicationForm) {
      $scope.formData = {
        questions: applicationForm.questions
      };

      $scope.setFormTitle($scope.submittable, $scope.applicationType, applicationForm);

      $scope.formData.questions.forEach(function (question) {
        if (question.input_type !== FORM_QUESTION_TYPES.checkbox.id) {
          question.answersGiven = [{}]; // Only one answer which needs a body attribute
        }
        else {
          question.answersGiven = []; // Any number of answers for checkboxes
        }
      });
    });

    $scope.formQuestionTypes = FORM_QUESTION_TYPES;
    $scope.applicationTypes = APPLICATION_TYPES;

    $scope.setFormTitle = function(submittable, applicationType, applicationForm) {
      if ($scope.submittable) {
        switch (applicationType) {
          case APPLICATION_TYPES.adoption.id:
            $scope.formTitle = 'Adoption Application';
          break;

          case APPLICATION_TYPES.foster.id:
            $scope.formTitle = 'Foster Application';
          break;
        }
      }
      else {
        $scope.formTitle = applicationForm.name;
      }
    };

    // Called from form

    $scope.validateCheckbox = function(question, currentForm) {
      if (question.is_required && question.answersGiven.length === 0) {
        currentForm.$setValidity('required', false);
      }
      else {
        currentForm.$setValidity('required', true);
      }
    };

    $scope.toggleCheckBoxAnswer = function toggleCheckBoxAnswer(formData,
      questionIndex, newAnswer, currentForm) {
      var question = formData.questions[questionIndex];

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

    $scope.submit = function(mainForm, formData, pet, applicationType) {
      if (mainForm.$valid) {
        $scope.showAnswers = true;

        if ($scope.submittable && pet) {
          $scope.transformBeforeSave(formData, applicationType, pet, $scope.$parent.user);

          petApplicationService.postPetApplication({ pet_application: $scope.pet_application});
        }
      }
    };

    $scope.transformBeforeSave = function(formData, applicationType, pet, user) {
      $scope.pet_application = {};
      $scope.pet_application.questions_attributes = formData.questions;
      for (var i = 0; i < formData.questions.length; i++) {
        $scope.pet_application.questions_attributes[i].answers_attributes = formData.questions[i].answersGiven;
      }

      $scope.pet_application.pet_id = pet.id;
      $scope.pet_application.user_id = user.id;
      $scope.pet_application.application_type = applicationType;
    };
  });
