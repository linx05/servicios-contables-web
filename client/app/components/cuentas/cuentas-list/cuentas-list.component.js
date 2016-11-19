import template from './cuentas-list.html';
import controller from './cuentas-list.controller';
import './cuentas-list.css';

let cuentasListComponent = {
    bindings: {
        onSelectItem: '&',
        onDeleteItem: '&',
        cuentas: '<'
    },
    template,
    controller
};

export default cuentasListComponent;
