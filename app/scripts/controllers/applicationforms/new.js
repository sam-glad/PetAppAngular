'use strict';

angular.module('petApp')
  .controller('ApplicationFormsNewCtrl', function ($scope, $window,
    ApplicationForm, FORM_QUESTION_TYPES) {
    function Answer() {
      this.body = '';
    }

    function Question() {
      this.body = '';
      this.input_type = FORM_QUESTION_TYPES.smallTextbox.id;
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

    // Methods called from form

    $scope.addQuestion = function () {
      $scope.application_form.questions_attributes.push(new Question());
    };

    $scope.addAnswer = function (index) {
      $scope.application_form.questions_attributes[index].answers_attributes.
        push(new Answer());
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

    $scope.createApplicationForm = function() {
      $scope.transformBeforeSave();

      var applicationForm = new ApplicationForm({
        application_form: $scope.application_form
      });

      applicationForm.$save().then(function(data) {
        $window.location.href = '#/applicationforms/' + data.id;
      },
      function(error) {
        console.log(error) // TODO: Proper error handling
      });
    };

    // Helpers

    $scope.clearBlanks = function() {
      $scope.application_form.questions_attributes.forEach(function (question) {
        if (!question.typeRequiresAnswer()) {
          question.answers_attributes = [];
        }
      });
    };

    // Should not be necessary, but better safe than sorry - clears up bad data
    // TODO: Determine whether this is less expensive than setting up a watch on
    //       each question and updating is_required when input_type becomes
    //       checkbox
    $scope.clearIsRequiredForCheckboxes = function() {
      var checkboxQuestions = $scope.application_form.questions_attributes.filter(function(question) {
        return question.input_type === FORM_QUESTION_TYPES.checkbox.id;
      });

      checkboxQuestions.forEach(function(question) {
        question.is_required = false;
      });
    };

    $scope.transformBeforeSave = function() {
      $scope.clearBlanks();
      $scope.clearIsRequiredForCheckboxes();
    };
  });
