import template from './recibos-print-form.html';
import controller from '../../documento-print-form.controller';
import './recibos-print-form.css';

let pagosPrintFormComponent = {
    bindings: {
        data: '<'
    },
    template,
    controller
};

export default pagosPrintFormComponent;
