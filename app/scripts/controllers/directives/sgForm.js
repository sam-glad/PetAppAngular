'use strict';

angular.module('petApp')
  .controller('SgFormCtrl', function ($scope, $routeParams, $window, $route,
    applicationFormService, petApplicationService, FORM_QUESTION_TYPES, APPLICATION_TYPES) {

    // Setup

    $scope.showAnswers = false;
    $scope.formQuestionTypes = FORM_QUESTION_TYPES;
    $scope.applicationTypes = APPLICATION_TYPES;
    $scope.submitButtonText = $scope.submittable ? 'Submit' : 'Test Submit';

    if (typeof $scope.applicationFormId === 'undefined') {
      $scope.applicationFormId = $routeParams.id; // Application form show page
    }

    if (typeof $scope.applicationForm === 'undefined') {
      $scope.applicationForm = applicationFormService.getApplicationForm($scope.applicationFormId)
        .then(function(applicationForm) {
          $scope.formData = formDataInit($scope.submittable, $scope.applicationType, applicationForm);
        });
    }
    else {
      $scope.formData = formDataInit($scope.submittable, $scope.applicationType, $scope.applicationForm);
    }

    // Called from form

    $scope.toggleCheckBoxAnswer = function(formData, questionIndex, newAnswer, currentForm) {
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

      validateCheckbox(question, currentForm);
    };

    // Initialize required checkbox subforms as invalid,
    // since they require an answer but none is checked upon loading the page.
    $scope.checkboxFormValidityInit = function (checkboxForm, question) {
      if (question.isRequired) {
        checkboxForm.$setValidity('required', false);
      }
    };

    $scope.submit = function(mainForm, formData, pet, applicationType) {
      if (mainForm.$valid) {
        $scope.showAnswers = true;

        if ($scope.submittable && pet) {
          $scope.petApplication = transformBeforeSave(formData, applicationType, pet, $scope.$parent.user);

          petApplicationService.postPetApplication({ pet_application: $scope.petApplication})
            .then(function(response) {
              $route.reload();
            });
        }
      }
    };

    // Helpers

    function formDataInit(submittable, applicationType, applicationForm) {
      var formData = {
        questions: applicationForm.questions
      };

      setFormTitle(submittable, applicationType, applicationForm);
      formDataQuestionsInit(formData);
      return formData;
    }

    function formDataQuestionsInit(formData) {
      formData.questions.forEach(function (question) {
        if (question.inputType !== FORM_QUESTION_TYPES.checkbox.id) {
          question.answersGiven = [{}]; // Only one answer which needs a body attribute
        }
        else {
          question.answersGiven = []; // Any number of answers for checkboxes
        }
      });
    }

    function setFormTitle(submittable, applicationType, applicationForm) {
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

    function validateCheckbox(question, currentForm) {
      if (question.isRequired && question.answersGiven.length === 0) {
        currentForm.$setValidity('required', false);
      }
      else {
        currentForm.$setValidity('required', true);
      }
    };

    function transformBeforeSave(formData, applicationType, pet, user) {
      petApplication = {};
      petApplication.questions_attributes = formData.questions; // Rename for Rails controller

      for (var i = 0; i < formData.questions.length; i++) {
        petApplication.questions_attributes[i].answers_attributes = formData.questions[i].answersGiven; // Rename for Rails controller
      }

      petApplication.pet_id = pet.id;
      petApplication.user_id = user.id;
      petApplication.application_type = applicationType;
      return petApplication;
    }
  });
