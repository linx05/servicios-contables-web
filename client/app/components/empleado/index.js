import angular from 'angular';
import uiRouter from 'angular-ui-router';
import empleadoComponent from './empleado.component';

let empleadoModule = angular.module('empleado', [
        uiRouter
    ])
    .component('empleado', empleadoComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
        .state('empleado', {
            url      : '/i/Empleado',
            component: 'empleado',
            data     : {requiresLogin: true, level: ['empleado']}
        });
        $urlRouterProvider.otherwise('/login');
    })
    .name;

export default empleadoModule;
