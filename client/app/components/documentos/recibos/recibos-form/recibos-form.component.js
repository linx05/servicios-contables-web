import template from './recibos-form.html';
import controller from './recibos-form.controller';
import './recibos-form.css';

let recibosFormComponent = {
    bindings: {
        data: '<',
        event: '<',
        onSave: '&',
    },
    template,
    controller
};

export default recibosFormComponent;
