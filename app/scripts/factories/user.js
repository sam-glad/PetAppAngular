'use strict';

angular.module('petApp')
  .factory('User', function (UtilsService, Organization) {

    function User(id, name, email, organizations, organizationMemberships, adminOrganizations) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.organizations = UtilsService.buildModelsFromResponse(organizations, Organization);
        this.organizationMemberships = organizationMemberships;
        this.adminOrganizations = adminOrganizations;
    }

    User.build = function (userFromJson) {
      return new User(
        userFromJson.id,
        userFromJson.name,
        userFromJson.email,
        userFromJson.organizations,
        userFromJson.organizationMemberships,
        userFromJson.adminOrganizations
      );
    };

    return User;
  })
