import angular from 'angular';
import firmasListComponent from './firmas-list.component';

const firmasList = angular
	.module('firmas.list', [])
	.component('firmasList', firmasListComponent)
	.name;

export default firmasList;
