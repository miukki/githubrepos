angular
	.module('App')
	.config(['$locationProvider', function ($locationProvider) {
		$locationProvider.hashPrefix('');
	}]);
