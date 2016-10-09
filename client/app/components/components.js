import angular from 'angular';
import Home from './home';
import Login from './login';
import Admin from './admin';
import Employee from './employee';
import User from './user';

let componentModule = angular.module('app.components', [
    Login,
    Admin,
    Employee,
    User,
    Home
])
    .name;

export default componentModule;
