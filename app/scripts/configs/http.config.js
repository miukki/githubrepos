'use strict';

angular
  .module('App')
  .config(configHttpProvider);

configHttpProvider.$inject = ['$httpProvider'];

function configHttpProvider ($httpProvider) {

  //$httpProvider.defaults.withCredentials = true;

  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.interceptors.push('cacheInterceptor');

}
