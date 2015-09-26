'use strict';

angular.module('petApp')
  .service('applicationFormsService', function ($resource, $window) {
    return {
      applicationForms: $resource('http://localhost:9393/application_forms', {}, {
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
