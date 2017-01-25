
/**
 * @ngdoc directive
 * @name App.directive:jsonSchema
 * @scope
 * @restrict A
 *
 * @description
 * A directive to associate a model with a JSON validation schema. It registers
 * the association to the jsonSchemaValidationService, which will do the actual
 * validation.
 *
 * @example
  <pre>
    <form name="form" novalidate json-schema="main.schema" json-schema-model="main._template">
    </form>
  </pre>
 */
angular
  .module('App')
  .directive('jsonSchema', jsonSchema);

jsonSchema.$inject = ['jsonSchemaValidationService', 'lodash'];

function jsonSchema (jsonSchemaValidationService, _) {

  'use strict';

  var NG_PROPERTY_PREFIX = /^\$\$?/;

  var directive = {
    link: linker,

    controller: ['$scope', function($scope){
      
      var self = this;

      self.registerForm = registerForm;

      $scope.$watch('latest', function(n) {
        if (!angular.isString(n)) {
          return;
        }
        registerForm();
      });

      function registerForm() {

        var name = $scope.name;
        var form = $scope.$parent[name];
        var fields = [];

        for (var field in form) {
          if(form.hasOwnProperty(field) && !(NG_PROPERTY_PREFIX.test(field))) {
            fields.push({ key: field, value: form[field] });
          }
        }


        $scope.$watch('model', function(n) {
          if (!n) { return; }
          jsonSchemaValidationService.register(name, $scope.model, $scope.schema, fields);
        });

        $scope.$watch('schema', function(n) {
          if (!n || _.isEmpty(n)) { return; }
          jsonSchemaValidationService.register(name, $scope.model, $scope.schema, fields);
        });

      }


    }],

    transclude: true,
    scope: {
      model: '=jsonSchemaModel',
      schema: '=jsonSchema'
    },
    restrict: 'A',
    template: '<div ng-transclude></div>'
  };

  return directive;

  function linker (scope, element, attrs) {

    scope.name = attrs['name'];
    scope.latest = attrs['latest'];
  
  }
}
