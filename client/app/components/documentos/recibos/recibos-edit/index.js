import angular from 'angular';
import recibosEditComponent from './recibos-edit.component';

const recibosEdit = angular
	.module('recibos.edit', [])
	.component('recibosEdit', recibosEditComponent)
	.name;

export default recibosEdit;
