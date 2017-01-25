'use strict';

/**
  * @ngdoc object
  * @name App.controller:MainController
  * @description
  * Controller for main page
  * @requires
  * @requires
  * @requires
**/
angular
  .module('App')
  .controller('MainController', MainController);

MainController.$inject = ['$scope', 'regexpConstant', '$location'];

function MainController ($scope ,regexpConstant, $location) {

	angular.extend(this, {
		regexpConstant: regexpConstant,
		$location: $location
	});

	this.onLoad = function () {
		//onload fired after $viewContentLoaded
	};

	$scope.$on('$viewContentLoaded', function (event) {
		//$viewContentLoaded fired first
		$scope.viewContentLoaded = true;
	});
}

MainController.prototype.isMode = function (mode) {
	return this.regexpConstant[mode].test(this.$location.path());
};

