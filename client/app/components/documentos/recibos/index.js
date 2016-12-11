import angular from 'angular';
import recibosEdit from './recibos-edit';
import recibosForm from './recibos-form';
import reciboPrintForm from './recibo-print-form';
import RecibosService from './recibos.service';
const recibos = angular
	.module('recibos', [
		recibosEdit,
        recibosForm,
        reciboPrintForm
	])
    .service('RecibosService',RecibosService)
	.name;

export default recibos;
