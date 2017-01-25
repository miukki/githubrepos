/**
  * @ngdoc service
  * @name App.service:shareDataService
  * @requires
**/

angular
  .module('App')
  .factory('shareDataService', shareDataService);

shareDataService.$inject = [];

function shareDataService () {
  'use strict';
  
  var savedData = {};

  function set(data) {
    savedData = angular.extend(savedData, data);
  }

  function get() {
    return savedData || {};
  }

  function getMenu () {
    return get().menu || [];
  }

 return {
  set: set,
  get: get,
  getMenu: getMenu
 };

}

