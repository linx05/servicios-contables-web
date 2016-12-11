import angular from 'angular';
import 'angular-toarrayfilter';
import estadoCuentaListComponent from './estado-cuenta-list.component';

const estadoCuentaList = angular
	.module('estado-cuenta.list', [
        'angular-toArrayFilter'
    ])
	.component('estadoCuentaList', estadoCuentaListComponent)
	.name;

export default estadoCuentaList;
