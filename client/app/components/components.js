import angular from 'angular';
import Home from './home';
import Login from './login';
import Admin from './admin';
import Employee from './employee';
import User from './user';
import Sidebar from './admin/sidebar';
import DatosForm from './admin/datosForm';

let componentModule = angular.module('app.components', [
    Login,
    Admin,
    Employee,
    User,
    Home,
    Sidebar,
    DatosForm
])
    .name;

export default componentModule;
