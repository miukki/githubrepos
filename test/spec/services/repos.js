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

  it('test reposService.get()', inject(function($httpBackend, _reposService_) {
    $httpBackend.expect('GET', DATA.constantObject.API+'/users/username/repos').respond(200, {});
    _reposService_.get('username');
    $httpBackend.flush(); 
  }));

  


});
