'use strict';

angular.module('petApp')
  .factory('Answer', function (Restangular, FORM_QUESTION_TYPES) {

    function Answer(questionId, id, body) {
      this.questionId = questionId;
      this.id = id;
      this.body = body;
    }

    Answer.buildBlank = function () {
      return Answer.build({body: ''});
    };

    Answer.build = function (answerFromJson) {
      return new Answer(
        answerFromJson.questionId,
        answerFromJson.id,
        answerFromJson.body
      );
    };

    return Answer;
  })
