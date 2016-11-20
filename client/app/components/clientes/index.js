import angular from 'angular';
import ClientesService from './clientes.service';
import clientesComponent from './clientes.component';
import clientesList from './clientes-list';
import clientesForm from './clientes-form';
import clientesEdit from './clientes-edit';

let clientesModule = angular.module('clientes', [
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
                data: {requiresLogin: true, level: ['admin', 'empleado']},
                resolve: {
                    data: ['ClientesService',function (ClientesService) {
                        return ClientesService.get().then(data => data);
                    }],
                }
            });
        $urlRouterProvider.otherwise('/login');
    })
    .name;

export default clientesModule;
