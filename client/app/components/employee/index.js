import angular from 'angular';
import uiRouter from 'angular-ui-router';
import employeeComponent from './employee.component';

let employeeModule = angular.module('employee', [
        uiRouter
    ])
    .component('employee', employeeComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
        .state('employee', {
            url      : '/i/employee',
            component: 'employee',
            data     : {requiresLogin: true, level: ['employee']}
        });
        $urlRouterProvider.otherwise('/login');
    })
    .name;

export default employeeModule;
