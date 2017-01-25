'use strict';

/**
  * @ngdoc object
  * @name App.controller:HeaderController
  * @description
  * Controller for Heaer Templates Pages
**/
angular
  .module('App')
  .controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', 'shareDataService', '$route'];

function HeaderController ($scope, shareDataService, $route) {
  var route = $route && $route.current && $route.current.$$route || {};
  this.title = route.title || route.header || 'Git Hub Repos!';
  this.description = 'Input User Name and find his/her repos!';

}

