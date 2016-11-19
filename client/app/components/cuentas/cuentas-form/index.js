import angular from 'angular';
import cuentasFormComponent from './cuentas-form.component';

const cuentasForm = angular
	.module('cuentas.form', [])
	.component('cuentasForm', cuentasFormComponent)
	.name;

export default cuentasForm;
