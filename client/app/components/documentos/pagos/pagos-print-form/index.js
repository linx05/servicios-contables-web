import angular from 'angular';
import pagosFormComponent from './pagos-print-form.component';

let pagosPrintFormModule = angular.module('pagos.print-form', [])
    .component('pagosPrintForm', pagosFormComponent)
    .name;

export default pagosPrintFormModule;
