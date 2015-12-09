'use strict';

angular.module('petApp')
  .factory('PetApplication', function (Restangular, ApplicationForm, Question,
    Answer, Organization, Pet, UtilsService, PET_APPLICATION_STATUSES) {

    function PetApplication(id, status, createdAt, questions, organization,
      organizationId, user, userId, pet, petId, applicationType) {
      this.id = id;
      this.petId = petId;
      this.organizationId = organizationId;
      this.status = status;
      this.createdAt = createdAt;
      this.questions = UtilsService.buildQuestionsFromJson(questions);
      if (organization) {
        this.organization = Organization.build(organization);
        this.organizationId = organization.id;
      }
      if (pet) {
        this.pet = Pet.build(pet);
        this.organizationId = pet.organizationId;
        this.petId = pet.id;
      }
      this.user = user; // TODO: Make a User factory
      this.userId = userId;
      this.applicationType = applicationType;
    }

    PetApplication.prototype.approve = function () {
      this.status = PET_APPLICATION_STATUSES.approved.id;
    }

    PetApplication.prototype.deny = function () {
      this.status = PET_APPLICATION_STATUSES.denied.id;
    }

    PetApplication.prototype.transformForDirective = function () {
      this.questions.forEach(function (question) {
        if (!question.answersGiven) {
          question.answersGiven = question.answers;
        }
      });
    };

    PetApplication.prototype.transformBeforeSave = function () {
      // Rename for Rails controller
      this.pet_id = this.petId;
      this.organization_id = this.organizationId;
      this.application_type = this.applicationType;
      this.questions_attributes = this.questions;
      for (var i = 0; i < this.questions.length; i++) {
        this.questions_attributes[i].answers_attributes = this.questions[i].answersGiven;
      }
      return { pet_application: this };
    };

    PetApplication.buildBlankFromApplicationForm = function (applicationForm, pet, applicationType) {
      return PetApplication.build({
        pet: pet,
        applicationType: applicationType,
        questions: applicationForm.questions
      });
    };

    PetApplication.build = function (data) {
      return new PetApplication(
        data.id,
        data.status,
        data.createdAt,
        data.questions,
        data.organization,
        data.organizationId,
        data.user,
        data.userId,
        data.pet,
        data.petId,
        data.applicationType
      );
    };

    return PetApplication;
  })
