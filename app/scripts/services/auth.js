'use strict';

angular.module('petApp')
  .service('authService', function ($resource, $window) {
    return {
      userLogin: $resource('http://localhost:9393/auth/sign_in', {}, {
        login: { method: 'POST',
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
