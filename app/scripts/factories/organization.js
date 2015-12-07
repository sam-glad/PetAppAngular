'use strict';

angular.module('petApp')
  .factory('Organization', function (Restangular, Question, Answer, UtilsService, DeletedObject) {

    function Organization(id, name, city, stateProvince, country, phoneNumber,
      phoneExtension, emailAddress, website, phonePreferred, users) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.stateProvince = stateProvince;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.phoneExtension = phoneExtension;
        this.emailAddress = emailAddress;
        this.website = website;
        this.phonePreferred = phonePreferred;
        this.users = users; // TODO: Make a users factory
    }

    Organization.prototype.displayLocation = function () {
      return this.city + ', ' + this.stateProvince;
    };

    Organization.prototype.displayContactInfo = function() {
      return this.phonePreferred ?
        this.phoneNumber.toString() + this.phoneExtension :
        this.emailAddress;
    };

    Organization.build = function (organizationFromJson) {
      return new Organization(
        organizationFromJson.id,
        organizationFromJson.name,
        organizationFromJson.city,
        organizationFromJson.stateProvince,
        organizationFromJson.country,
        organizationFromJson.phoneNumber,
        organizationFromJson.phoneExtension,
        organizationFromJson.emailAddress,
        organizationFromJson.website,
        organizationFromJson.phonePreferred,
        organizationFromJson.users // TODO: Make a users factory
      );
    };

    return Organization;
  })
