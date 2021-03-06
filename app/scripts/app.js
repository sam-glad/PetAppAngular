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
  .config(function ($routeProvider, $authProvider, RestangularProvider, $anchorScrollProvider, UserProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          // FIXME: Is this redundant? It seems like it should be...
          prepareUser
        }
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
      .when('/petapplications/:id', {
        templateUrl: 'views/petapplications/show.html',
        controller: 'PetApplicationShowCtrl',
        resolve: {
          petApplicationsPrepService: petApplicationsPrepService
        }
      })
      .when('/pets', {
        templateUrl: 'views/pets/index.html',
        controller: 'PetsIndexCtrl'
      })
      .when('/pets/:id', {
        templateUrl: 'views/pets/show.html',
        controller: 'PetsShowCtrl',
        resolve: {
          petPrep: petPrep,
        }
      })
      .otherwise({
        redirectTo: '/'
      });

      function prepareUser($auth, $rootScope) {
        $auth.validateUser().then(function(response) {
          var User = UserProvider.$get();
          var user = User.build(response);
          $rootScope.user = user;
        })
      }

      function applicationFormsPrepService(applicationFormService, $route) {
        return applicationFormService.getApplicationForm($route.current.params.id);
      }

      function petPrep(petService, $route) {
        return petService.getPet($route.current.params.id);
      }

      function petApplicationsPrepService(petApplicationService, $route) {
        return petApplicationService.getPetApplication($route.current.params.id);
      }

      $authProvider.configure({
        apiUrl: 'http://localhost:9393',

        handleLoginResponse: function(response, $rootScope) {
          var User = UserProvider.$get();
          var user = User.build(response.data);
          return user;
        },

        handleTokenValidationResponse: function(response) {
          var User = UserProvider.$get();
          var user = User.build(response.data);
          return user;
        }
      });

      RestangularProvider
        .setBaseUrl('http://localhost:9393/api');

      $anchorScrollProvider.disableAutoScrolling();
  });
