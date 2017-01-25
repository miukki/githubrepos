angular
	.module('App')
	.controller('AlertModalController', AlertModalController);

AlertModalController.$inject = ['context'];

function AlertModalController(context) {
	'use strict';
	angular.extend(this, context);
}