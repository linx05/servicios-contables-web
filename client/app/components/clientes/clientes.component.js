import template from './clientes.html';
import controller from './clientes.controller';
import './clientes.css';

let clienteComponent = {
    bindings: {
        data: '<',
    },
    template,
    controller
};

export default clienteComponent;
