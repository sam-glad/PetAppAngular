'use strict';

angular.module('petApp')
  .constant('RESOURCES', (function() {
    var resource = 'http://localhost:9393';
      return {
        ROOT_URL: resource,
        ORGANIZATIONS_API: resource + '/organizations',
        APPLICATION_FORMS_API: resource + '/application_forms',
        PETS_API: resource + '/pets'
      }
    })())
    .constant('FORM_QUESTION_TYPES',
      {
        smallTextbox: { name:'Small Textbox', id: 0 },
        largeTextbox: { name:'Large Textbox', id: 1 },
        dropdown: { name:'Dropdown', id: 2 },
        radio: { name:'Radio button', id: 3 },
        checkbox: { name:'Checkbox', id: 4 }
      }
  );
