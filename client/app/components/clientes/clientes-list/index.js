import angular from 'angular';
import clientesListComponent from './clientes-list.component';

let clienteModule = angular.module('clientes.list', [])
    .component('clientesList', clientesListComponent)
    .name;

export default clienteModule;
