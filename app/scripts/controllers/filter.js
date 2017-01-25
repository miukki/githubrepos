/**
  * @ngdoc object
  * @name App.controller:FilterController
  * @description
  * Controller for left sidebar
**/
angular
  .module('App')
  .controller('FilterController', FilterController);

FilterController.$inject = ['$scope', 'shareDataService', 'lodash'];

function FilterController ($scope, shareDataService, _) {
	'use strict';
  var self = this;

  self.tabs = [{
  	name: 'Template',
  	tmpl: 'template'
  },{
  	name: 'Cart',
  	tmpl: 'cart'	
  },
  {
  	name: 'Product',
  	tmpl: 'product'
  },
  {
  	name: 'Contract',
  	tmpl: 'contract'
  }
  ];

}

