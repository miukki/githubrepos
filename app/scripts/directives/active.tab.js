
angular
	.module('App')
	.directive('routeData', routeData);

routeData.$inject = ['$rootScope', '$location'];

function routeData($rootScope, $location) {
	'use strict';

	return {
		link: link,
		scope: { uri: '=routeDataUri', isActive: '=routeDataActive'},
		restrict: 'A'

	};

	function link(scope, element, attrs) {

		$rootScope.$on('$routeChangeSuccess', handler);

		function handler() {

			angular.extend(scope, {
				isActive: scope.uri === $location.path()
			});

		}

		handler();

	}

}