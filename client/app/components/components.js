import angular from 'angular';
import Home from './home';
import Login from './login';
import Admin from './admin';
import Empleado from './empleado';
import User from './user';
import DatosForm from './admin/datosForm';
import Cliente from './cliente';
import Clientes from './clientes';
import Cuentas from './cuentas';
import Documentos from './documentos';

let componentModule = angular.module('app.components', [
    Login,
    Admin,
    Cliente,
    Clientes,
    Cuentas,
    Empleado,
    User,
    Home,
    Documentos,
    DatosForm
])
    .name;

export default componentModule;
