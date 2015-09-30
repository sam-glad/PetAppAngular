'use strict';

angular
  .module('petApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.validate',
    'ngMessages',
    'ng-token-auth'
  ])
  .config(function ($routeProvider, $authProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'IndexCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations.html',
        controller: 'OrganizationsCtrl'
      })
      .when('/userregistration', {
        templateUrl: 'views/userregistration.html',
        controller: 'UserRegistrationCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/applicationforms/new', {
        templateUrl: 'views/applicationforms/new.html',
        controller: 'ApplicationFormsNewCtrl'
      })
      .when('/applicationforms/:id', {
        templateUrl: 'views/applicationforms/show.html',
        controller: 'ApplicationFormsShowCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $authProvider.configure({
          apiUrl: 'http://localhost:9393'
      });
  });
