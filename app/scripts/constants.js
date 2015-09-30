'use strict';

angular.module('petApp')
  .constant('RESOURCES', (function() {
    var resource = 'http://localhost:9393';
      return {
        ROOT_URL: resource,
        ORGANIZATIONS_API: resource + '/organizations',
        APPLICATION_FORMS_API: resource + '/application_forms/:id'
      }
    })())
  .constant('FORM_QUESTION_TYPES',
    [
      { id: 0, name: 'Small Textbox' },
      { id: 1, name: 'Large Textbox' },
      { id: 2, name: 'Dropdown' },
      { id: 3, name: 'Radio' },
      { id: 4, name: 'Checkbox' }
    ]
  );
