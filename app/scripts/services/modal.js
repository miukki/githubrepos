/**
  * @ngdoc service
  * @name App.service:modalService
  * @requires $modal, $rootScope
**/

angular
  .module('App')
  .factory('modalService', modalService);

modalService.$inject = ['$uibModal', '$rootScope', '$filter'];


function modalService ($uibModal, $rootScope, $filter) {
  'use strict';

  function dismissModal(modal, reason) {
    if (modal) {
      modal.dismiss(reason);
    }
  }

  var uibModalInstance;

  $rootScope.$on('$routeChangeStart', function(event) {
    dismissModal(uibModalInstance, event.name);
  });

  function showModal (size, templateUrl, context, controller, controllerAs) {

    dismissModal(uibModalInstance, 'new popup is opened');

	  uibModalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: templateUrl,
      controller: controller,
      controllerAs: controllerAs || 'modal',
      bindToController: true,
      size: size,
      resolve: context
      //scope: $scope
    });

    return uibModalInstance;
  }

  /*
  uibModalInstance.opened.then(function(){
    //opened after downloading contents template and resolving all variables;
  });
  uibModalInstance.rendered.then(function(){
    //modal is rendered;
  });
  uibModalInstance.result.then(function (selectedItem) {
    //if modal is closed
  }, function () {
    //if modal is dismissed
    //$log.info('Modal dismissed at: ' + new Date());
  });
  */  

  function getCurrentStep (modalSteps) {
    var modalStep = $filter('filter')(modalSteps, {isActive: true});
    return modalStep[0];
  }

  function moveStep(idx,s,modalSteps) {

    var index = idx>=0 && idx  || getCurrentStep(modalSteps).index;

    if (!modalSteps[index+s]) {
      return;
    }
  
    modalSteps[index].isActive = false;
    modalSteps[index+s].isActive = true; 

  }

  function cancel() {
	  dismissModal(uibModalInstance);
  }


  return {
    showModal: showModal,
    getCurrentStep: getCurrentStep,
    moveStep: moveStep,
    cancel: cancel
  };

}


