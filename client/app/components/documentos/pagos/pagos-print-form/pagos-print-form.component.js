import template from './pagos-print-form.html';
import controller from './pagos-print-form.controller';
import './pagos-print-form.css';

let pagosFormComponent = {
    bindings: {
        data: '<',
        event: '<',
        onSave: '&',
    },
    template,
    controller
};

export default pagosFormComponent;
