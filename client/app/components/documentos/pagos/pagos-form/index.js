import angular from 'angular';
import pagosFormComponent from './pagos-form.component';

let pagosFormModule = angular.module('pagos.form', [])
    .component('pagosForm', pagosFormComponent)
    .name;

export default pagosFormModule;
