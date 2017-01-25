angular
  .module('App')
.directive('formTemplate', formTemplate);

formTemplate.$inject = ['jsonSchemaValidationService', 'lodash'];

function formTemplate(jsonSchemaValidationService,  _) {
  'use strict';
  return {
    restrict: 'EA',
    transclude: true,
    require: '^^jsonSchema',
    link: function(scope, element, attrs, parentController) {

      scope.latest = attrs.latest;

      scope.$watch(attrs.tmpls, function(n) {
        if (!n || _.isEmpty(n)) { return; }
        jsonSchemaValidationService.addFormFields(n, scope, element);

      });

      scope.$watch('latest', function(n) {
        if (!angular.isString(n)) {
          return;
        }
        parentController.registerForm();//we call registerForm once all templates is loaded
      });

    },
    template: '<div ng-transclude></div>'
  };
}

