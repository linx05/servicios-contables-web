import angular from 'angular';
import DocumentosItemComponent from './documentos-item.component';

const documentosItem = angular
	.module('documentos.item', [])
	.component('documentosItem', DocumentosItemComponent)
	.name;

export default documentosItem;
