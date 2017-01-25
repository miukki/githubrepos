describe('Service: serviceBus', function() {
  'use strict';

	var serviceBus;


	beforeEach(function(){
	  module('App');
	});


  beforeEach(inject(function(_serviceBus_) {
  	serviceBus = _serviceBus_;

  }));


  it('serviceBus.validate() expect false', inject(function($compile, $rootScope, _jsonSchemaValidationService_) {

    //prepare NgModelController
    var schema = window.__fixtures__['app/data/repos.schema'];
    var model = {name: 'foo'};
  	var directiveElement = $compile('<input ng-model="name" name="name" type="text" >')($rootScope);
  	$rootScope.$digest();
  	var NgModelController = directiveElement.controller('ngModel');
  	NgModelController.$modelValue = 'title';

  	var jsonSchemaValidationService = _jsonSchemaValidationService_;
    jsonSchemaValidationService.register('form', model, schema, [{name: 'name', value: NgModelController}]);

  	var validate = serviceBus.validate('form');
  	expect(validate.valid).toBe(true);
    
    
  }));



});
