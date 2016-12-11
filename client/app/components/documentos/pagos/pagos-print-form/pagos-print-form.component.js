import template from './pagos-print-form.html';
import controller from './pagos-print-form.controller';
import './pagos-print-form.css';

let pagosPrintFormComponent = {
    bindings: {
        data: '<'
    },
    template,
    controller
};

export default pagosPrintFormComponent;
