'use strict';

angular
  .module('App')
  .factory('authInterceptor', authInterceptor);

authInterceptor.$inject = ['$window', '$q'];

function authInterceptor ($window, $q) {
  return {
    responseError: function (resp) {

	    var errorCode = resp.status === -1 ? 504 : resp.status;
	    var redirectUrl = '/#/error/' + errorCode;
	    if (errorCode !== 404){
		    $window.location.href = redirectUrl;
	    }

      return $q.reject(resp);
    }
  };
}
