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
    'ng-token-auth',
    'angular.filter',
    'restangular'
  ])
  .config(function ($routeProvider, $authProvider, RestangularProvider, $anchorScrollProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'IndexCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/organizations', {
        templateUrl: 'views/organizations/index.html',
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
        controller: 'ApplicationFormsShowCtrl',
        resolve: {
          applicationFormsPrepService: applicationFormsPrepService
        }
      })
      .when('/organizations/:id/petapplications', {
        templateUrl: 'views/petapplications/index.html',
        controller: 'PetApplicationsIndexCtrl'
      })
      .when('/pets', {
        templateUrl: 'views/pets/index.html',
        controller: 'PetsIndexCtrl'
      })
      .when('/pets/:id', {
        templateUrl: 'views/pets/show.html',
        controller: 'PetsShowCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      function applicationFormsPrepService(applicationFormService, $route) {
        return applicationFormService.getApplicationForm($route.current.params.id);
      }

      $authProvider.configure({
          apiUrl: 'http://localhost:9393'
      });

      RestangularProvider
        .setBaseUrl('http://localhost:9393');

      $anchorScrollProvider.disableAutoScrolling();
  });
