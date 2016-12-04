import angular from 'angular';
import DocumentosEditComponent from './documentos-edit.component';

const documentosEdit = angular
	.module('documentos.edit', [])
	.component('documentosEdit', DocumentosEditComponent)
	.name;

export default documentosEdit;
