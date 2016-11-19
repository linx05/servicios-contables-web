import angular from 'angular';
import ClientesService from './clientes.service';
import clientesComponent from './clientes.component';
import clientesList from './clientes-list';

let clientesModule = angular.module('clientes', [
    clientesList
])
    .service('ClientesService', ClientesService)
    .component('clientes', clientesComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('clientes', {
                url: '/i/clientes',
                component: 'clientes',
                data: {requiresLogin: true, level: ['admin', 'empleado']}
            });
        $urlRouterProvider.otherwise('/login');
    })

    .name;

export default clientesModule;
