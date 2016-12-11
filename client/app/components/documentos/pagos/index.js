import angular from 'angular';
import pagosEdit from './pagos-edit';
import pagosForm from './pagos-form';
import pagosPrintForm from './pagos-print-form';
import PagosService from './pagos.service';

const pagos = angular
	.module('pagos', [
		pagosEdit,
        pagosForm,
        pagosPrintForm
	])
    .service('PagosService',PagosService)
	.name;

export default pagos;
