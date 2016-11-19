import angular from 'angular';
import cuentasService from './cuentas.service';
import cuentasComponent from './cuentas.component';
import cuentasList from './cuentas-list';

let cuentasModule = angular.module('cuentas', [
    cuentasList
])
    .service('cuentasService', cuentasService)
    .component('cuentas', cuentasComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('cuentas', {
                url: '/i/cuentas',
                component: 'cuentas',
                data: {requiresLogin: true, level: ['admin']}
            });
        $urlRouterProvider.otherwise('/login');
    })

    .name;

export default cuentasModule;
