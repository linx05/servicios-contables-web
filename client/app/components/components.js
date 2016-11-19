import angular from 'angular';
import Home from './home';
import Login from './login';
import Admin from './admin';
import Empleado from './empleado';
import User from './user';
import DatosForm from './admin/datosForm';
import Cliente from './cliente';
import CLientes from './clientes';

let componentModule = angular.module('app.components', [
    Login,
    Admin,
    Cliente,
    CLientes,
    Empleado,
    User,
    Home,
    DatosForm
])
    .name;

export default componentModule;
