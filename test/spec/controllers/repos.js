describe('Service: reposService', function() {
  'use strict';

  var reposService,
  DATA = window.__fixtures__['test/fixtures/data'],
  schema = window.__fixtures__['app/data/repos.schema'];

  beforeEach(module('App'));

  beforeEach(function(){
    module(function($provide) {
      $provide.constant('Constant', DATA.constantObject);
    });
  });

  beforeEach(inject(function(_reposService_) {
    reposService = _reposService_;
  }));



  it('test save()', inject(function($httpBackend, _reposService_, $controller, _serviceBus_, $rootScope, $q, $compile) {
    var scope = $rootScope.$new();

    var passPromise = false;

    var ReposController = $controller('ReposController', {
      serviceBus: _serviceBus_,
      $scope: scope
    });

    //mocking promise 
    ReposController.getSchema = jasmine.createSpy('getSchema').and.callFake(function(){
      ReposController.schema = schema;
    });

    //mocking promise 
    ReposController.serviceBus.reposService.get = jasmine.createSpy('get').and.callFake(function(){
      var deferred = $q.defer();
      deferred.resolve({data: [{name: 'repo'}]});
      passPromise = true;
      return deferred.promise;
    });

    ReposController._data = {name: 'name'};
    ReposController.getSchema();

    $compile('<form name="form" novalidate json-schema="schema" json-schema-model="model" ></form>')(scope);

    ReposController.save(scope.form);

    expect(_serviceBus_.validate('form').valid).toBe(true);
    expect(passPromise).toBe(true);
    expect(ReposController.isUpdating).toBe(true);
    //ReposController.serviceBus.reposService.get('name');
    scope.$digest();//if you mock promise
    

    
  }));


});
