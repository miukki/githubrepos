'use strict';

/**
  * @ngdoc object
  * @name App.controller:ErrorController
  * @description
  * Controller for error pages
  * @requires
  * @requires
  * @requires
**/

angular
  .module('App')
  .controller('ErrorController', ErrorController);

ErrorController.$inject = ['$routeParams', '$window'];

function ErrorController ($routeParams, $window) {


  var msg = {
  	404: 'Not Found',
	  504: 'Sorry, we can\'t display the page.',
	  401: 'Unauthorized HTTP responses. Please login.'
  };

	angular.extend(this, {
	  errorCode: $routeParams.id || '404',
    message: msg[$routeParams.id || '404'],
		goBack:function () {
			$window.location.href = '/';
	  	}
		}
  );

}
