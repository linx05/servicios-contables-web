import angular from 'angular';
import DocumentosFormComponent from './documentos-form.component';

const documentosForm = angular
	.module('documentos.form', [])
	.component('documentosForm', DocumentosFormComponent)
	.name;

export default documentosForm;
