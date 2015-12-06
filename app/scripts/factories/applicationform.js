'use strict';

angular.module('petApp')
  .factory('ApplicationForm', function (Restangular, Question, Answer, UtilsService) {

    function ApplicationForm(id, name, questions, organizationId, deletedQuestions) {
      this.id = id;
      this.name = name;
      this.questions = buildQuestionsFromJson(questions);
      this.organizationId = organizationId;
      this.deletedQuestions = deletedQuestions ? deletedQuestions : [];
    }

    function buildQuestionsFromJson(questionsFromJson) {
      var builtQuestions = []
      questionsFromJson.forEach(function (questionFromJson) {
        builtQuestions.push(Question.build(questionFromJson))
      });
      return builtQuestions;
    }

    ApplicationForm.prototype.addBlankQuestion = function () {
      var blankQuestion = Question.buildBlank(this.getNextPosition());
      this.questions.push(blankQuestion);
    };

    ApplicationForm.prototype.deleteQuestionAtIndex = function (questionIndex) {
      if (this.questions.length > 1) {
        var deletedQuestionId = this.questions[questionIndex].id;
        if (deletedQuestionId) {
          this.deletedQuestions.push({'id': deletedQuestionId, '_destroy': 1}); // TODO: DeletedQuestion model
        }
        this.questions.splice(questionIndex, 1);
      }
    };

    ApplicationForm.prototype.getMaxPosition = function () {
      return Math.max.apply(Math, this.questions.map(function(question) {
        return question.position;
      }))
    };

    ApplicationForm.prototype.getNextPosition = function() {
      var maxPosition = this.getMaxPosition();
      return maxPosition > this.questions.length ? maxPosition + 1 : this.questions.length + 1;
    };

    ApplicationForm.prototype.orderQuestions = function () {
      UtilsService.sortByKey(this.questions, 'position');
      for (var i = 0; i < this.questions.length; i++) {
        this.questions[i].position = i + 1;
      }
    };

    ApplicationForm.prototype.clearBlanks = function () {
      this.questions.forEach(function (question) {
        if (!question.requiresAnswer()) {
          question.answers = [];
        }
      });
    };

    ApplicationForm.prototype.addDeletedAnswersArray = function () {
      this.questions.forEach(function (question) {
        question.deletedAnswers = [];
      });
    };

    ApplicationForm.prototype.transformQuestionsBeforeSave = function () {
      this.questions_attributes = this.questions;
      this.questions_attributes.forEach(function (question) {
        question.transformBeforeSave();
      });
      this.questions_attributes = this.questions_attributes.concat(this.deletedQuestions); // Ensure pre-existing questions are deleted
    };

    ApplicationForm.prototype.transformBeforeSave = function () {
      this.organization_id = this.organizationId;
      this.orderQuestions();
      this.clearBlanks();
      this.transformQuestionsBeforeSave();
    };

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
        data.id,
        data.name,
        data.questions,
        data.organizationId,
        data.deletedQuestions
      );
    };

    return ApplicationForm;
  })
