/**
  * @ngdoc reposService
  * @name App.service:reposService
  * @requires $http
  * @requires Constant
  * @requires $q
  * @requires App.service:Resource
**/

angular
  .module('App')
  .service('reposService', reposService);

reposService.$inject = ['$http', 'Constant', '$q', 'Resource'];

function reposService ($http, Constant, $q, Resource) {
  'use strict';

  var API = Constant.API;
  /* jshint validthis:true */
  var API_GET= API + '/users/%s/repos',
	  API_SCHEMA= 'data/repos.schema.json';

	this.get = function(name) {

		var resc = new Resource(API_GET).replace(name);
		return $http.get(resc.endpoint, {timeToLive: Constant.timeToLive}).then(function (resp) {
      return resp.data || {};
		});

	};

	this.getSchema = function () {
		return $http.get(API_SCHEMA);
	};


}
