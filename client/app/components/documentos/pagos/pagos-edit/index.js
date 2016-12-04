import angular from 'angular';
import clientesEditComponent from './clientes-edit.component';

const clientesEdit = angular
	.module('clientes.edit', [])
	.component('clientesEdit', clientesEditComponent)
	.name;

export default clientesEdit;
