import angular from 'angular';
import recibosFormComponent from './recibos-print-form.component';

let recibosPrintFormModule = angular.module('recibos.print-form', [])
    .component('recibosPrintForm', recibosFormComponent)
    .name;

export default recibosPrintFormModule;
