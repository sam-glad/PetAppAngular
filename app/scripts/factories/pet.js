'use strict';

angular.module('petApp')
  .factory('Pet', function (Restangular, Organization) {

    function Pet(id, animal, isMix, age, name, size, sex, description, status,
      goodWithDogs, goodWithCats, goodWithKids, organizationId,
      adoptionApplicationId, fosterApplicationId, isAdoptable, isFosterable,
      breeds, organization) {
        this.id = id;
        this.animal = animal;
        this.isMix = isMix;
        this.age = age;
        this.name = name;
        this.size = size;
        this.sex = sex;
        this.description = description;
        this.status = status;
        this.goodWithDogs = goodWithDogs;
        this.goodWithCats = goodWithCats;
        this.goodWithKids = goodWithKids;
        this.organizationId = organizationId;
        this.adoptionApplicationId = adoptionApplicationId;
        this.fosterApplicationId = fosterApplicationId;
        this.isAdoptable = isAdoptable;
        this.isFosterable = isFosterable;
        this.breeds = breeds; // TODO: Make a breeds model?
        if (organization) {
          this.organization = Organization.build(organization);
        }
    }

    Pet.prototype.displayBreeds = function() {
      if (!this.breeds.length > 1) {
        return this.breeds[0].name;
      }
      var output = '';
      this.breeds.forEach(function(breed) {
        output += ' ' + breed.name;
      });
      return output += ' mix';
    };

    Pet.prototype.isAvailableForAdoption = function() {
      return this.isAdoptable && this.adoptionApplicationId;
    };

    Pet.prototype.isAvailableForFoster = function () {
      return this.isFosterable && this.fosterApplicationId;
    }

    Pet.prototype.transformBeforeSave = function() {
      this.is_adoptable = this.isAdoptable;
      this.is_fosterable = this.isFosterable;
      this.adoption_applicatoin_id = this.adoptionApplicationId;
      this.foster_application_id = this.fosterApplicationId;
    };

    Pet.build = function (petFromJson) {
      return new Pet(
        petFromJson.id,
        petFromJson.animal,
        petFromJson.isMix,
        petFromJson.age,
        petFromJson.name,
        petFromJson.size,
        petFromJson.sex,
        petFromJson.description,
        petFromJson.status,
        petFromJson.goodWithDogs,
        petFromJson.goodWithCats,
        petFromJson.goodWithKids,
        petFromJson.organizationId,
        petFromJson.adoptionApplicationId,
        petFromJson.fosterApplicationId,
        petFromJson.isAdoptable,
        petFromJson.isFosterable,
        petFromJson.breeds,
        petFromJson.organization
      );
    };

    return Pet;
  })
