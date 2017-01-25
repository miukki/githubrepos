
/**
 * @ngdoc service
 * @name staticRoutes.service:serviceStaticRoutes
 * @requires $route
 * @requires lodash
 *
 * @description
 * A service that transformes routes  to menu  for left sidebar (pnav.tmpl).
 *
 **/

angular.module('staticRoutes', ['ngRoute', 'ngLodash'])
.service('serviceStaticRoutes', serviceStaticRoutes);

serviceStaticRoutes.$inject = ['$route', 'lodash'];


function serviceStaticRoutes ($route, _){
  'use strict';

  function getPaths () {
    var paths = [];

    _.forEach($route.routes, function (config) {
      if (!config) {
        return;
      }

      var redirectTo = config.redirectTo;
      var disabled = (!config.templateUrl && !config.originalPath && redirectTo) || config.hidden;
      var redirectToWithTitle = config.title &&  redirectTo;

      if ((config.originalPath || redirectToWithTitle) && !disabled) {
        paths.push({
          uri: config.originalPath || config.redirectTo,
          header: config.header || '',
          title: config.title || config.originalPath,
          groupBy: config.groupBy,
          type: config.typeIcon
        });
      }

    });

    return paths;
  }

  function getOutPutArray (paths) {
      var output = [];

      if (angular.isArray(paths) && paths.length) {

        var group = _.groupBy(paths, 'header');

	      for (var j in group ){
		      if (!j) {
			      continue;
		      }
		      output.push({header: j || '', groups: [], items: group[j], isBasic: true});

	      }

      }

      return output;
  }

  function menuItemsSet () {

      var paths = getPaths();

      return getOutPutArray(paths);
  }

  return {
    menuItemsSet: menuItemsSet
  };
}
