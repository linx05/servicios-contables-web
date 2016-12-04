import angular from 'angular';
import pagosEdit from './pagos-edit';
import pagosForm from './pagos-form';

const pagos = angular
	.module('pagos', [
		pagosEdit,
        pagosForm
	])
	.name;

export default pagos;
