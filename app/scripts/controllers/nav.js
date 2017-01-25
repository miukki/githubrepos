
/**
  * @ngdoc object
  * @name App.controller:NavController
  * @description
  * Controller for left sidebar
  * @requires App.service:shareDataService
  * @requires
  * @requires
**/
angular
  .module('App')
  .controller('NavController', NavController);

NavController.$inject = ['$scope', 'shareDataService', 'lodash', '$location', 'regexpConstant'];

function NavController ($scope, shareDataService, _, $location, regexpConstant) {
  'use strict';

  this.menuItems = shareDataService.getMenu();


}

