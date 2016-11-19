import angular from 'angular';
import cuentasEditComponent from './cuentas-edit.component';

const cuentasEdit = angular
	.module('cuentas.edit', [])
	.component('cuentasEdit', cuentasEditComponent)
	.name;

export default cuentasEdit;
