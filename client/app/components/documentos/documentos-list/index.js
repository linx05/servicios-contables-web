import angular from 'angular';
import DocumentosListComponent from './documentos-list.component';

const documentosList = angular
	.module('documentos.list', [])
	.component('documentosList', DocumentosListComponent)
	.name;

export default documentosList;
