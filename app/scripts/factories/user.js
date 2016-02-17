'use strict';

angular.module('petApp')
  .factory('User', function (UtilsService, Organization) {

    function User(id, name, organizations, organizationMemberships) {
        this.id = id;
        this.name = name;
        this.organizations = UtilsService.buildModelsFromResponse(organizations, Organization);
        this.organizationMemberships = organizationMemberships;
    }

    User.prototype.getAdminOrganizations = function () {
      var adminOrganizationMemberships = this.organizationMemberships.filter(function (organizationMembership) {
        return organizationMembership.isAdmin = true
      });

      var adminOrganizationIds = []
      adminOrganizationMemberships.forEach(function (adminOrganizationMembership) {
        adminOrganizationIds.push(adminOrganizationMembership.organizationId);
      });

      var adminOrganizations = []
      this.organizations.filter(function (organization) {
        if (adminOrganizationIds.indexOf(organization.id) !== -1) {
          adminOrganizations.push(organization);
        }
      });

      return adminOrganizations;
    };

    User.build = function (userFromJson) {
      return new User(
        userFromJson.id,
        userFromJson.name,
        userFromJson.organizations,
        userFromJson.organizationMemberships
      );
    };

    return User;
  })
