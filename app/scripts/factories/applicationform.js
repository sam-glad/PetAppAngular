'use strict';

angular.module('petApp')
  .factory('applicationFormService', function(Restangular) {
    var service = {
      getApplicationForm: getApplicationForm,
      postApplicationForm: postApplicationForm,
      getApplicationFormsByOrganizationId: getApplicationFormsByOrganizationId
    };

    var resource = Restangular.all('application_forms');

    function getApplicationForm(applicationFormId) {
      return Restangular.one('application_forms', applicationFormId).get();
    }

    function getApplicationFormsByOrganizationId(organizationId) {
      return Restangular
        .service('application_forms', Restangular.one('organizations', organizationId))
          .getList();
    }

    function postApplicationForm(applicationForm) {
      return resource.post(applicationForm);
    }

    function prepareApplicationFormForView(applicationForm) {
      applicationForm.questions_attributes = applicationForm.questions;
      applicationForm.questions_attributes.forEach(function(question) {
        question.answers_attributes = question.answers;
      });
    }

    return service;
  });
