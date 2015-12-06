'use strict';

angular.module('petApp')
  .factory('ApplicationForm', function (Restangular, Question, Answer, UtilsService) {

    function ApplicationForm(name, questionsFromJson, organizationId, deletedQuestions) {
      this.name = name;
      this.questions = buildQuestionsFromJson(questionsFromJson);
      this.organizationId = organizationId;
      this.deletedQuestions = deletedQuestions ? deletedQuestions : [];
    }

    function buildQuestionsFromJson(questionsFromJson) {
      var builtQuestions = []
      questionsFromJson.forEach(function (questionsFromJson) {
        builtQuestions.push(Question.build(questionsFromJson))
      });
      return builtQuestions;
    }

    ApplicationForm.prototype.addBlankQuestion = function () {
      var blankQuestion = Question.buildBlank(this.getNextPosition());
      this.questions.push(blankQuestion);
    }

    ApplicationForm.prototype.getMaxPosition = function () {
      return Math.max.apply(Math, this.questions.map(function(question) {
        return question.position;
      }))
    }

    ApplicationForm.prototype.getNextPosition = function() {
      var maxPosition = this.getMaxPosition();
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
      var form = ApplicationForm.build({
        questions: [], deletedQuestions: []
      });
      form.addBlankQuestion();
      form.addDeletedAnswersArray;
      return form;
    };

    ApplicationForm.build = function (data) {
      return new ApplicationForm(
        data.name,
        data.questions,
        data.organizationId,
        data.deletedQuestions
      );
    };

    return ApplicationForm;
  })
