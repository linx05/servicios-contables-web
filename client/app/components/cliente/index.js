import angular from 'angular';
import uiRouter from 'angular-ui-router';
import clienteComponent from './cliente.component';

let clienteModule = angular.module('cliente', [
    uiRouter
])
    .component('cliente', clienteComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('cliente', {
                url: '/i/cliente',
                component: 'cliente',
                data: {requiresLogin: true, level: ['cliente']}
            });
        $urlRouterProvider.otherwise('/login');
    })

    .name;

export default clienteModule;
