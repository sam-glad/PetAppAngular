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

    ApplicationForm.prototype.orderQuestions = function () {
      UtilsService.sortByKey(this.questions, 'position');
      for (var i = 0; i < this.questions.length; i++) {
        this.questions[i].position = i + 1;
      }
    }

    ApplicationForm.build = function (data) {
      return new ApplicationForm(
        data.name,
        data.questions,
        data.organization
      );
    };

    return ApplicationForm;
  })
