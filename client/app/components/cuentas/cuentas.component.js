import template from './cuentas.html';
import controller from './cuentas.controller';
import './cuentas.css';

let clienteComponent = {
    bindings: {
        data: '<',
    },
    template,
    controller
};

export default clienteComponent;
