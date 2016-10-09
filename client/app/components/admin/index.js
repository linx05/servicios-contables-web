import angular from 'angular';
import uiRouter from 'angular-ui-router';
import adminComponent from './admin.component';

let adminModule = angular.module('admin', [
    uiRouter
    ])
    .component('admin', adminComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
        .state('admin', {
            url      : '/i/admin',
            component: 'admin',
            data     : {requiresLogin: true, level: ['admin']}
        });
        $urlRouterProvider.otherwise('/login');
    })
    .name;

export default adminModule;
