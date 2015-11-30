'use strict';

angular.module('petApp')
  .controller('PetApplicationShowCtrl', function ($scope, petApplicationsPrepService) {
    $scope.petApplication = petApplicationsPrepService;
    transformForDirective($scope.petApplication);

    function transformForDirective(petApplication) {
      petApplication.questions.forEach(function (question) {
        if (!question.answersGiven) {
          question.answersGiven = question.answers;
        }
      });
    }
  });
