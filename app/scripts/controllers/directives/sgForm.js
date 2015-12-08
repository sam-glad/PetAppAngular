'use strict';

angular.module('petApp')
  .controller('SgFormCtrl', function ($scope, $routeParams, $window, $route,
    applicationFormService, PetApplication, petApplicationService,
    FORM_QUESTION_TYPES, APPLICATION_TYPES) {

    // Setup

    var vm = this;

    $scope.showAnswers = false;
    $scope.formQuestionTypes = FORM_QUESTION_TYPES;
    $scope.applicationTypes = APPLICATION_TYPES;
    $scope.submitButtonText = vm.submittable ? 'Submit' : 'Test Submit';

    if (typeof vm.applicationFormId === 'undefined') {
      $scope.applicationFormId = $routeParams.id; // Application form show page
    }

    if (typeof vm.applicationForm === 'undefined') {
       applicationFormService.getApplicationForm(vm.applicationFormId)
        .then(function(applicationForm) {
          $scope.applicationForm = applicationForm;
          $scope.formData = formDataInit(vm.submittable, vm.applicationType,
            $scope.applicationForm, vm.pet);
        });
    }
    else {
      $scope.applicationForm = vm.applicationForm;
      $scope.formData = formDataInit($scope.submittable, vm.applicationType,
        $scope.applicationForm, vm.pet);
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

    $scope.submit = function(mainForm, formData, submittable, pet, applicationType) {
      if (mainForm.$valid) {
        $scope.showAnswers = true;

        if (submittable && pet) {
          var petApplication = formData.transformBeforeSave();

          petApplicationService.postPetApplication(petApplication)
            .then(function(response) {
              $route.reload();
            });
        }
      }
    };

    // Helpers

    function formDataInit(submittable, applicationType, applicationForm, pet) {
      var blankPetApplication = PetApplication.buildBlankFromApplicationForm(applicationForm, pet, applicationType);
      setFormTitle(submittable, applicationType, applicationForm);
      return blankPetApplication;
    }

    function setFormTitle(submittable, applicationType, applicationForm) {
      if (vm.submittable) {
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
  });
