import angular from 'angular';
import cuentasListComponent from './cuentas-list.component';

let clienteModule = angular.module('cuentas.list', [])
    .component('cuentasList', cuentasListComponent)
    .name;

export default clienteModule;
