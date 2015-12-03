'use strict';

angular.module('petApp')
  .controller('SgFormBuilderCtrl', function ($scope, $window, $route,
    applicationFormService, UtilsService, FORM_QUESTION_TYPES, CRUD_ACTIONS, REGEX) {

    $scope.formQuestionTypes = FORM_QUESTION_TYPES;
    $scope.crudActions = CRUD_ACTIONS;

    function Answer() {
      this.body = '';
    }

    function Question(questions) {
      this.body = '';
      this.input_type = '';
      this.is_required = false;
      this.position = nextPosition(questions);
      this.answers = [new Answer()];
      this.deletedAnswers = [];
    }

    // Called from form

    $scope.typeRequiresAnswer = function (question) {
      return !(question.input_type === FORM_QUESTION_TYPES.smallTextbox.id ||
               question.input_type === FORM_QUESTION_TYPES.largeTextbox.id);
    };

    $scope.addQuestion = function (questions) {
      questions.push(new Question(questions));
      UtilsService.scrollTo('bottom');
    };

    $scope.addAnswer = function (applicationForm, questionIndex) {
      var answers = applicationForm.questions[questionIndex].answers;
      answers.push(new Answer());
      UtilsService.scrollTo('bottom-question-index-' + questionIndex + '-answer-index-' + (answers.length - 1));
    };

    $scope.deleteQuestion = function(applicationForm, questionIndex, deletedQuestions) {
      if (applicationForm.questions.length > 1) {
        var deletedQuestionId = applicationForm.questions[questionIndex].id
        // Delete questions currently belonging to the application form
        // (deletedQuestions is merged into applicationForm.questions before request is sent)
        if (deletedQuestionId) {
          deletedQuestions.push({'id': deletedQuestionId, '_destroy': 1});
        }
        applicationForm.questions.splice(questionIndex, 1);
      }
    };

    $scope.deleteAnswer = function(question, answerIndex) {
      if (question.answers.length > 1) {
        var deletedAnswerId = question.answers[answerIndex].id
        if (deletedAnswerId) {
          question.deletedAnswers.push({'id': deletedAnswerId, '_destroy': 1});
        }
        question.answers.splice(answerIndex, 1);
      }
    };

    // Initialize form

    $scope.deletedQuestions = [];
    $scope.formQuestionTypes = FORM_QUESTION_TYPES;
    $scope.crudActions = CRUD_ACTIONS;
    $scope.integers = REGEX.integers;

    if (typeof $scope.applicationForm === 'undefined') {
      var applicationForm = {};
      applicationForm.questions = [];
      $scope.addQuestion(applicationForm.questions);
      $scope.applicationForm = applicationForm;
    }

    addDeletedAnswersArray($scope.applicationForm.questions)
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

    function clearBlanks(questions) {
      questions.forEach(function (question) {
        if (!$scope.typeRequiresAnswer(question)) {
          question.answers = [];
        }
      });
    }

    function transformBeforeSave(applicationForm, deletedQuestions) {
      cleanUpPositions(applicationForm.questions);
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

    function cleanUpPositions(questions) {
      questions = UtilsService.sortByKey(questions, 'position');
      for (var i = 0; i < questions.length; i++) {
        questions[i].position = i + 1;
      }
    }

    function getMaxPosition(questions) {
      return Math.max.apply(Math, questions.map(function(question) {
        return question.position;
      }))
    }

    function nextPosition(questions) {
      var maxPosition = getMaxPosition(questions);
      return maxPosition > questions.length ? maxPosition + 1 : questions.length + 1;
    }

    function addDeletedAnswersArray(questions) {
      questions.forEach(function (question) {
        question.deletedAnswers = [];
      });
    }
  });
