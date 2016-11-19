import angular from 'angular';
import pagination from 'angular-utils-pagination';

import CuentasService from './cuentas.service';
import cuentasComponent from './cuentas.component';
import cuentasList from './cuentas-list';

let cuentasModule = angular.module('cuentas', [
    'angularUtils.directives.dirPagination',
    cuentasList
])
    .service('CuentasService', CuentasService)
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
