'use strict';

angular.module('petApp')
    .constant('CRUD_ACTIONS',
      {
        create: 0,
        update: 1
      }
    )
    .constant('FORM_QUESTION_TYPES',
      {
        smallTextbox: { name:'Small Textbox', id: 0 },
        largeTextbox: { name:'Large Textbox', id: 1 },
        dropdown: { name:'Dropdown', id: 2 },
        radio: { name:'Radio button', id: 3 },
        checkbox: { name:'Checkbox', id: 4 }
      }
    )
    .constant('APPLICATION_TYPES',
      {
        adoption: { id: 0 },
        foster: { id: 1 },
      }
    )
    .constant('PET_APPLICATION_STATUSES',
      {
        pending: { id: 0, name: 'Pending' },
        denied: { id: 1, name: 'Denied' },
        approved: { id: 2, name: 'Approved' }
      }
    )
    .constant('REGEX',
      {
        integers: /^[1-9]+$/
      }
    );
