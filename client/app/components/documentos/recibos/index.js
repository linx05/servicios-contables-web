import angular from 'angular';
import recibosEdit from './recibos-edit';
import recibosForm from './recibos-form';

const recibos = angular
	.module('recibos', [
		recibosEdit,
        recibosForm
	])
	.name;

export default recibos;
