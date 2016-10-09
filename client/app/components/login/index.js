import angular from 'angular';

import LoginComponent from './login.component';
import LoginForm from './login-form/index';

const login = angular
	.module('login', [LoginForm])
	.component('login', LoginComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		$stateProvider
			.state('login', {
				url: '/login',
				component: 'login',
				data: { requiresLogin: false },
		});
		$urlRouterProvider.otherwise('login');
	})
	.name;

export default login;