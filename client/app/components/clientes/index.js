import angular from 'angular';
import 'angular-wizard/dist/angular-wizard.min';
import 'angular-wizard/dist/angular-wizard.min.css';

import ClientesService from './clientes.service';
import clientesComponent from './clientes.component';
import clientesList from './clientes-list';
import clientesForm from './clientes-form';
import clientesEdit from './clientes-edit';

let clientesModule = angular.module('clientes', [
    'mgo-angular-wizard',
    clientesList,
    clientesForm,
    clientesEdit
])
    .service('ClientesService', ClientesService)
    .component('clientes', clientesComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('clientes', {
                url: '/i/clientes',
                component: 'clientes',
                params: {
                    data: null
                },
                data: {requiresLogin: true, level: ['admin', 'empleado']},
                resolve: {
                    data: ['$stateParams', 'ClientesService',function ($stateParams, ClientesService) {
                        if ($stateParams.data) return $stateParams.data;
                        return ClientesService.get().then(data => data);
                    }],
                }
            });
        $urlRouterProvider.otherwise('/login');
    })
    .name;

export default clientesModule;
