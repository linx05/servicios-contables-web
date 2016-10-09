import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter
])

.component('home', homeComponent)
.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state('home', {
        url      : '/i/home',
        component: 'home',
        data     : {requiresLogin: true, level: ['user']}
    });
    $urlRouterProvider.otherwise('/login');
})
.name;

export default homeModule;
