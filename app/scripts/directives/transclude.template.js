angular
  .module('App')
.directive('transcludeTemplate', transcludeTemplate);

transcludeTemplate.$inject = ['$parse', 'regexpConstant', '$location'];

function transcludeTemplate($parse, regexpConstant, $location) {
  'use strict';
  function isMode (mode) {
		return regexpConstant[mode].test($location.path());
	}

	var directive = {
    restrict: 'EAC',
    transclude: true,
    templateUrl: function(element, attrs) {

      return attrs.src !== '' ? attrs.src  : !isMode('error') ? 'layout.tmpl' : 'errorlayout.tmpl';
    }
  };
  return directive;
}
