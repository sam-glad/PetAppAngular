'use strict';

angular.module('petApp')
  .factory('applicationFormService', function(Restangular, ApplicationForm,
    Organization, UtilsService) {

    var service = {
      getApplicationForm: getApplicationForm,
      postApplicationForm: postApplicationForm,
      getApplicationFormsByOrganizationId: getApplicationFormsByOrganizationId,
      putApplicationForm: putApplicationForm
    };

    var resource = Restangular.all('application_forms');

    function getApplicationForm(applicationFormId) {
      var applicationForm = Restangular.one('application_forms', applicationFormId).get();
      return applicationForm.then(function(responseData) {
        return UtilsService.buildModelsFromResponse(responseData, ApplicationForm);
      });
    }

    function getApplicationFormsByOrganizationId(organizationId) {
      var applicationForms = Restangular.service('application_forms', Restangular.one('organizations', organizationId));
      return applicationForms.getList().then(function(responseData) {
        return UtilsService.buildModelsFromResponse(responseData, ApplicationForm);
      });
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
