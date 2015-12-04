'use strict';

angular.module('petApp')
  .factory('ApplicationForm', function (Restangular, UtilsService) {

    function ApplicationForm(name, questions, organizationId) {
      this.name = name;
      this.questions = questions;
      this.organizationId = organizationId;
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
