'use strict';

angular.module('petApp')
  .factory('UtilsService', function(Question, $location, $timeout, $anchorScroll) {
    return {
      buildModelsFromResponse: function (responseData, modelType) {
        if (angular.isArray(responseData)) {
          return responseData
            .map(modelType.build)
            .filter(Boolean);
        }
        return modelType.build(responseData);
      },

       buildQuestionsFromJson: function(questionsFromJson) { // TODO: Get this redundant code out of here
        var builtQuestions = []
        questionsFromJson.forEach(function (questionFromJson) {
          builtQuestions.push(Question.build(questionFromJson))
        });
        return builtQuestions;
      },

      displayDate: function(date) {
        return moment(date).toDate().toString();
      },

      sortByKey: function(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
      },

      scrollTo: function(id) {
        $timeout(function() {
          $location.hash(id);
          $anchorScroll();
          $location.hash('');
        });
      }
    };
  });
