import template from './clientes-form.html';
import controller from './clientes-form.controller';
import './clientes-form.css';

let clientesFormComponent = {
    bindings: {
        data: '<',
        event: '<',
        onSave: '&',
    },
    template,
    controller
};

export default clientesFormComponent;
