import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userComponent from './user.component';

let userModule = angular.module('user', [
  uiRouter
])

.component('user', userComponent)
.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state('user', {
        url      : '/i/user',
        component: 'user',
        data     : {requiresLogin: true, level: ['user']}
    });
    $urlRouterProvider.otherwise('/login');
})
.name;

export default userModule;
