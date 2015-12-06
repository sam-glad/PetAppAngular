'use strict';

angular.module('petApp')
  .factory('ApplicationForm', function (Restangular, Question, UtilsService) {

    function ApplicationForm(name, questionsFromJson, organizationId) {
      this.name = name;
      this.questions = buildQuestionsFromJson(questionsFromJson);
      this.organizationId = organizationId;
    }

    function buildQuestionsFromJson(questionsFromJson) {
      var builtQuestions = []
      questionsFromJson.forEach(function (questionsFromJson) {
        builtQuestions.push(Question.build(questionsFromJson))
      });
      return builtQuestions;
    }

    ApplicationForm.prototype.addBlankQuestion = function () {
      var nextPosition = this.getNextPosition();
      var newQuestion = new Question('', '', '', '', false, nextPosition, [{body: ''}]); // TODO: Flesh out Answer class
      this.questions.push(newQuestion);
    }

    ApplicationForm.prototype.getMaxPosition = function () {
      return Math.max.apply(Math, this.questions.map(function(question) {
        return question.position;
      }))
    }

    ApplicationForm.prototype.getNextPosition = function() {
      var maxPosition = this.getMaxPosition(); // TODO: Move this in here
      return maxPosition > this.questions.length ? maxPosition + 1 : this.questions.length + 1;
    }

    ApplicationForm.prototype.orderQuestions = function () {
      UtilsService.sortByKey(this.questions, 'position');
      for (var i = 0; i < this.questions.length; i++) {
        this.questions[i].position = i + 1;
      }
    }

    ApplicationForm.prototype.clearBlanks = function () {
      this.questions.forEach(function (question) {
        if (question.requiresAnswer()) {
          question.answers = [];
        }
      });
    }

    ApplicationForm.prototype.addDeletedAnswersArray = function () {
      this.questions.forEach(function (question) {
        question.deletedAnswers = [];
      });
    }

    ApplicationForm.buildBlank = function () {
      var form = ApplicationForm.build({name: '', questions: [], organizationId: ''}); // FIXME: I think orgId should be nil? maybe make it optional
      form.addBlankQuestion();
      form.addDeletedAnswersArray;
      return form;
    };

    ApplicationForm.build = function (data) {
      return new ApplicationForm(
        data.name,
        data.questions,
        data.organizationId
      );
    };

    return ApplicationForm;
  })
