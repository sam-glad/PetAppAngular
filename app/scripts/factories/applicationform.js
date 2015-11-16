'use strict';

angular.module('petApp')
  .factory('applicationFormService', function(Restangular) {
    var service = {
      getApplicationForm: getApplicationForm,
      postApplicationForm: postApplicationForm,
      getApplicationFormsByOrganizationId: getApplicationFormsByOrganizationId,
      putApplicationForm: putApplicationForm
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

    function putApplicationForm(applicationForm) {
      var putResource = Restangular.one('application_forms', applicationForm.id);
      putResource.application_form = applicationForm;

      putResource.put();
    };

    return service;
  });
