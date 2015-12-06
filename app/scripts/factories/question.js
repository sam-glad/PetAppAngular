'use strict';

angular.module('petApp')
  .factory('Question', function (Restangular, Answer, FORM_QUESTION_TYPES) {

    function Question(applicationFormId, id, body, inputType, isRequired, position, answers) {
      this.applicationFormId = applicationFormId;
      this.id = id;
      this.body = body;
      this.inputType = inputType;
      this.isRequired = isRequired;
      this.position = position;
      this.answers = answers;
    }

    Question.prototype.requiresAnswer = function () {
      return !(this.inputType === FORM_QUESTION_TYPES.smallTextbox.id ||
               this.inputType === FORM_QUESTION_TYPES.largeTextbox.id);
    };

    Question.prototype.addBlankAnswer = function () {
      this.answers.push(Answer.buildBlank(this.id));
    };

    Question.prototype.deleteAnswerAtIndex = function (index) {
      if (this.answers.length > 1) {
        var deletedAnswerId = this.answers[index].id;
        if (deletedAnswerId) {
          this.deletedAnswers.push({'id': deletedAnswerId, '_destroy': 1}); // TODO: DeletedAnswer model
        }
        this.answers.splice(index, 1);
      }
    };

    Question.buildBlank = function (nextPosition) {
      return Question.build({
        isRequired: false,
        position: nextPosition,
        answers:[Answer.buildBlank()]
      });
    }

    Question.build = function (questionFromJson) {
      return new Question(
        questionFromJson.applicationFormId,
        questionFromJson.id,
        questionFromJson.body,
        questionFromJson.inputType,
        questionFromJson.isRequired,
        questionFromJson.position,
        questionFromJson.answers
      );
    };

    return Question;
  })
