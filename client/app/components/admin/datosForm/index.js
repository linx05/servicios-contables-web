import angular from 'angular';
import uiRouter from 'angular-ui-router';
import datosFormComponent from './datosForm.component';

let datosFormModule = angular.module('datosForm', [
  uiRouter
])

.component('datosForm', datosFormComponent)

.name;

export default datosFormModule;
