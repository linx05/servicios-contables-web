import angular from 'angular';
import recibosFormComponent from './recibos-form.component';

let recibosFormModule = angular.module('recibos.form', [])
    .component('recibosForm', recibosFormComponent)
    .name;

export default recibosFormModule;
