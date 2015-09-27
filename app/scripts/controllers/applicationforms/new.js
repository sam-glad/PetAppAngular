'use strict';

angular.module('petApp')
  .controller('ApplicationFormsNewCtrl', function ($scope,
    ApplicationForm, FORM_QUESTION_TYPES) {
    function Answer() {
      this.body = '';
    }

    function Question() {
      this.body = '';
      this.type = FORM_QUESTION_TYPES[0].id;
      this.answers_attributes = [new Answer()];
      this.isAnswerRequired = function () {
        return !(this.type === FORM_QUESTION_TYPES[0].id ||
                 this.type === FORM_QUESTION_TYPES[1].id);
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
      $scope.clearBlanks();

      var applicationForm = new ApplicationForm({
        application_form: $scope.application_form
      });

      applicationForm.$save().then(function(data) {
        console.log('Success!') // TODO: redirect to /applicationforms/:id
      },
      function(error) {
        console.log(error) // TODO: Proper error handling
      });
    };

    // Helpers
    $scope.clearBlanks = function() {
      $scope.application_form.questions_attributes.forEach(function (question) {
        if (!question.isAnswerRequired()) {
          question.answers_attributes = [];
        }
      });
    };
  });
