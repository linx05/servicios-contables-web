import angular from 'angular';
import pagination from 'angular-utils-pagination';

import CuentasService from './cuentas.service';
import cuentasComponent from './cuentas.component';
import cuentasList from './cuentas-list';
import cuentasEdit from './cuentas-edit';
import cuentasForm from './cuentas-form';

let cuentasModule = angular.module('cuentas', [
    'angularUtils.directives.dirPagination',
    cuentasList,
    cuentasEdit,
    cuentasForm
])
    .service('CuentasService', CuentasService)
    .component('cuentas', cuentasComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('cuentas', {
                url: '/i/cuentas',
                component: 'cuentas',
                data: {requiresLogin: true, level: ['admin']},
                resolve: {
                    data: ['CuentasService',function (CuentasService) {
                        return CuentasService.get().then(data => data);
                    }],
                }
            });
        $urlRouterProvider.otherwise('/login');
    })

    .name;

export default cuentasModule;
