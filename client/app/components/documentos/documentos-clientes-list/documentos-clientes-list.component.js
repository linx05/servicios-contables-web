import template from './documentos-clientes-list.html';
import controller from './documentos-clientes-list.controller';
import './documentos-clientes-list.css';

let clientesListComponent = {
    bindings: {
        onSelectItem: '&',
        clientes: '<'
    },
    template,
    controller
};

export default clientesListComponent;
