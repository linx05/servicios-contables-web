import angular from 'angular';
import recibosEdit from './recibos-edit';
import recibosForm from './recibos-form';
import RecibosService from './recibos.service';
const recibos = angular
	.module('recibos', [
		recibosEdit,
        recibosForm
	])
    .service('RecibosService',RecibosService)
	.name;

export default recibos;
