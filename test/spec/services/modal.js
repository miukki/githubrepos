describe('Service: modalService', function() {
  'use strict';

	var modalService, mock$Modal;

	beforeEach(function(){

	  module('ui.bootstrap');
	  module('App');

	  module(function($provide){
	    $provide.service('$uibModal', function(){
	      this.open = jasmine.createSpy('open');
	    });
	  });

	});


  beforeEach(inject(function(_modalService_, $uibModal) {
  	mock$Modal = $uibModal;
  	modalService = _modalService_;

  }));

  it('modalService.showModal()', inject(function() {
  	var context = {context: function () { return {}; }};

  	modalService.showModal('lg', 'alert.tmpl', context, 'AlertModalController', 'alert');

	  expect(mock$Modal.open).toHaveBeenCalledWith({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'alert.tmpl',
      controller: 'AlertModalController',
      controllerAs: 'alert',
      bindToController: true,
      size: 'lg',
      resolve: context
    });


  }));

});
