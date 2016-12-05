import template from './pagos-form.html';
import controller from './pagos-form.controller';
import './pagos-form.css';

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
