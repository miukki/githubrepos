'use strict';

/**
 * @ngdoc directive
 * @name App.directive:includeReplace
 * @scope
 * @restrict A
 *
 * @description
 * setting scope.dynamicTemplatePath
 * @example
	<div ng-include="'products/add/form/main.tmpl'" include-replace></div>

 */
angular
  .module('App')
  .directive('includeReplace', includeReplace);

includeReplace.$inject = [];

function includeReplace () {
    var directive = {
        require: 'ngInclude',
        //if scope is not defined, then parent scope is available
        restrict: 'A', /* optional */
        link: function (scope, element, attrs) {
           element.replaceWith(element.children());
        }
    };
    return directive;
}
