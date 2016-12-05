import angular from 'angular';
import ListDocumentosComponent from './list-documentos.component';

const listDocumentos = angular
	.module('documentos-list.list', [])
	.component('listDocumentos', ListDocumentosComponent)
	.name;

export default listDocumentos;
