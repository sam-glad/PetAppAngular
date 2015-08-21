'use strict';

angular.module('petApp')
  .service('authService', function ($resource) {
    return $resource('http://localhost:9393/auth', {}, {
      register: {
        method: 'POST',
        // TODO: Implement success/failure messages on the page, error tracking
        interceptor: {
            response: function (data) {
                console.log('response in interceptor', data);
            },
            responseError: function (data) {
                console.log('error in interceptor', data);
            }
        }
      }
    });
  });
