/**
 * @ngdoc service
 * @name App.service:jsonSchemaValidationService
 * @requires tv4
 * @requires lodash
 *
 * @description
 * A service that validates a model with an associated JSON schema
 **/
angular
  .module('App')
  .service('jsonSchemaValidationService', jsonSchemaValidationService);

jsonSchemaValidationService.$inject = ['tv4', 'lodash', '$compile', '$templateCache'];

function jsonSchemaValidationService (tv4, _, $compile, $templateCache) {
  'use strict';
  /* jshint validthis:true */
  var registry = {};

  this.addFormFields = function(tmpls, scope, element) {

    tmpls = angular.isString(tmpls) ? tmpls.split(','): [];
    var html = '';

    if (tmpls.length) {
      angular.forEach(tmpls, function(tmplUrl){

        tmplUrl = tmplUrl.replace(new RegExp('\\s', 'g'), '');
        html = String.prototype.concat(html, $templateCache.get(tmplUrl));

      });

      var template = angular.element(html);
      element.append(template);
      $compile(template)(scope);

    }

  };

  /**
   * @ngdoc method
   * @name jsonSchemaValidationService#isRegistered
   * @methodOf App.service:jsonSchemaValidationService
   *
   * @description
   * Check if a specific key is registered
   *
   * @param  {string} name  Registry key
   * @returns {boolean}     If the association identified by the key is registered
   */
  this.isRegistered = function(name) {
    return _.has(registry, name);
  };

  /**
   * @ngdoc method
   * @name jsonSchemaValidationService#register
   * @methodOf App.service:jsonSchemaValidationService
   *
   * @description
   * Associate a set of fields with a schema
   *
   * @param  {string} name    The association key
   * @param  {object} model   The model to validate
   * @param  {object} schema  The JSON schema to validate against
   * @param  {array}  fields  An array of ngModelController. Only errors related
   *                          to these fields will be reported
   */
  this.register = function(name, model, schema, fields) {
    
    registry[name] = {
      model: model,
      schema: schema,
      fields: fields
    };
  };

  /**
   * @ngdoc method
   * @name jsonSchemaValidationService#validate
   * @methodOf App.service:jsonSchemaValidationService
   *
   * @description
   * Validate a set of fields
   *
   * @param  {string} name The association key
   */
  this.validate = function(name) {
    if (!this.isRegistered(name)) {
      return;
    }

    var target = registry[name];
    
    var result = tv4.validateMultiple(target.model, target.schema);

    _.forEach(target.fields, function(field) {
      var relatedError = _.find(result.errors, function(error) {
        var regex = new RegExp('^'+'\/'+field.key);
        if (error.dataPath) {
          return regex.test(error.dataPath);
        }
        return error.params.key === field.key;
      });

      if (relatedError) {
        field.value.$setValidity('schema', false);
      } else {
        field.value.$setValidity('schema', true);
      }
    });

    return result || { valid: false };
  };
}
