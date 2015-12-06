'use strict';

angular.module('petApp')
  .factory('DeletedObject', function () {

    function DeletedObject(id) {
      this.id = id;
      this._destroy = 1; // Tell Rails controller to delete object with above ID
    }

    DeletedObject.build = function (id) {
      return new DeletedObject(id);
    };

    return DeletedObject;
  })
