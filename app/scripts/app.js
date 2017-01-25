
angular.module('App', [
  'ui.bootstrap',
  'ngRoute',
  'ngLoadingSpinner',
  'Constant',
  'Tmpls',
  'ngLodash',
  'staticRoutes',
  'smart-table'
]);

/* global tv4 */
angular.module('App').constant('tv4', tv4);
angular.module('App').constant('regexpConstant', {
  'error': /^\/error\/(?:([^\/]+))$/
});

angular.module('App').run(Init);

Init.$inject = ['shareDataService', 'serviceStaticRoutes'];

function Init (shareDataService, serviceStaticRoutes) {
  'use strict';

	shareDataService.set({menu: [].concat(serviceStaticRoutes.menuItemsSet(),[])});
}


