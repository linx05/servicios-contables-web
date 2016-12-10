import angular from 'angular';
import estadoCuentaListComponent from './estado-cuenta-list.component';

const estadoCuentaList = angular
	.module('estado-cuenta.list', [])
	.component('estadoCuentaList', estadoCuentaListComponent)
	.name;

export default estadoCuentaList;
