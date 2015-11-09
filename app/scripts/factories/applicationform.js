'use strict';

angular.module('petApp')
  .factory('applicationFormService', function(Restangular) {
    var service = {
      getApplicationForm: getApplicationForm,
      postApplicationForm: postApplicationForm
    };

    var resource = Restangular.all('application_forms');

    function getApplicationForm(applicationFormId) {
      return Restangular.one('application_forms', applicationFormId).get();
    }

    function postApplicationForm(applicationForm) {
      return resource.post(applicationForm);
    }

    return service;
  });
