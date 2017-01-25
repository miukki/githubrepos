
angular
	.module('App')
	.controller('ReposController', ReposController);

ReposController.$inject = ['serviceBus'];

function ReposController(serviceBus) {
	'use strict';

	angular.extend(this, {
		_data: {},
		serviceBus:serviceBus,
		repos: null
	});

	serviceBus.reposService.getSchema().then(function(resp) {
		this.schema = resp.data;
	}.bind(this));

}

ReposController.prototype.triggerChanges = function (form) {
	if (form) {
		this.serviceBus.validate(form.$name);
	}



};

ReposController.prototype.save = function (form ) {
	if (form) {
		this.serviceBus.validate(form.$name);
	}

	if (form && this.serviceBus.validate(form.$name).valid) {
		this.isUpdating = true;


		//post data
		var method = this.serviceBus.reposService.get(this._data.name)
			.then(function (resp) {
        this.repos = [].concat(resp);
 			}.bind(this))
			.catch(function (resp) {

        this.repos = null;

				if (resp.status === 404){
					this.serviceBus.ui.alert('', 'User ' + resp.statusText, 'ok');
				}


			}.bind(this))
			.finally(function () {
  			this.isUpdating = false;
			}.bind(this));


	}
};