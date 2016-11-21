import template from './clientes-list.html';
import controller from './clientes-list.controller';
import './clientes-list.css';

let clientesListComponent = {
    bindings: {
        onSelectItem: '&',
        onDeleteItem: '&',
        onAssignItem: '&',
        clientes: '<'
    },
    template,
    controller
};

export default clientesListComponent;
