import angular from 'angular';
import clientesFormComponent from './clientes-form.component';

let clientesFormModule = angular.module('clientes.form', [])
    .component('clientesForm', clientesFormComponent)
    .name;

export default clientesFormModule;
