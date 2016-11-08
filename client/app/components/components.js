import angular from 'angular';
import Home from './home';
import Login from './login';
import Admin from './admin';
import Empleado from './empleado';
import User from './user';
import Sidebar from './admin/sidebar';
import DatosForm from './admin/datosForm';
import Cliente from './cliente';

let componentModule = angular.module('app.components', [
    Login,
    Admin,
    Cliente,
    Empleado,
    User,
    Home,
    Sidebar,
    DatosForm
])
    .name;

export default componentModule;
