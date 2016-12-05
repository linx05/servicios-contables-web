import angular from 'angular';
import pagosEditComponent from './pagos-edit.component';

const pagosEdit = angular
	.module('pagos.edit', [])
	.component('pagosEdit', pagosEditComponent)
	.name;

export default pagosEdit;
