'use strict';

angular
  .module('App')
  .config(configRouteProvider);

configRouteProvider.$inject = ['$routeProvider', '$locationProvider'];

function configRouteProvider ($routeProvider, $locationProvider) {
  // Common routes
  $routeProvider

    .when('/', {
      redirectTo: '/repos'
    })

    .when('/repos', {
      templateUrl: 'repos.tmpl',
      controller: 'ReposController',
      controllerAs: 'main',
      title: 'Get Users Repos',
      header: 'Repositories'
    })

	  .when('/about', {
		  templateUrl: 'about.tmpl',
		  controller: 'ReposController',
		  controllerAs: 'main',
		  title: 'About',
		  header: 'Repositories'
	  })

	  //error
    .when('/error/:id', {
      templateUrl: 'error.tmpl',
      hidden: true
    })

    .otherwise({
      redirectTo: '/error/404'
    });


    //$locationProvider.html5Mode(true);


}
