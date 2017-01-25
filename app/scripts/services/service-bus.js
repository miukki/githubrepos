/**
 * @ngdoc service
 * @name App.service:serviveBus
 * @requires App.service:jsonSchemaValidationService
 *
 * @description
 * The service façade
 **/
angular
  .module('App')
  .service('serviceBus', serviceBus);

serviceBus.$inject = ['jsonSchemaValidationService', 'shareDataService', 'modalService', 'reposService'];

function serviceBus (jsonSchemaValidationService, shareDataService, modalService, reposService) {

  'use strict';

  /* jshint validthis: true */

  this.ui = {
    alert: alert
  };

  this.validate = function(registryKey) {
    if (!jsonSchemaValidationService.isRegistered(registryKey)) {
      return { valid: true };
    }
    return jsonSchemaValidationService.validate(registryKey);
  };

  this.addFormFields = function (tmpls, scope){//refactor
    jsonSchemaValidationService.addFormFields(tmpls, scope);
  };


  this.shareData = shareDataService;

  this.reposService = reposService;


  function alert (title, message, action) {
    return modalService.showModal('lg' ,'alert.tmpl', {context: function () {
		  return {title: title, message: message, action: action, cancel: this.cancel};
	  }.bind(modalService)}, 'AlertModalController', 'alert');
  }

}
