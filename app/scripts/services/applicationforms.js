'use strict';

angular.module('petApp')
  .service('applicationFormsService', function ($resource, $window, RESOURCES) {
    return {
      applicationForms: $resource(RESOURCES.APPLICATION_FORMS_API, {}, {
        new: { method: 'POST',
        interceptor: {
            response: function (data) {
                $window.location.href = '/'; // TODO: This should probably be some other page
            },
            responseError: function (data) {
                console.log('error in interceptor', data); // TODO: Flash message
            }
          }
        }
      })
    };
  });
