class ClientesListController {
    constructor () {
        this.pageSize = 20;
    }

    $onChanges(changes) {
        if (changes.clientes) {
            this.clientes = Object.assign({}, this.clientes);
        }
    }

    filterFunc (value, index, array) {
        if($ctrl.filter=='') return true;

    }

    assignItem(item) {
        this.onAssignItem({
            $event: {data: item}
        });
    }

    selectItem(item) {
        this.onSelectItem({
            $event: {data: item}
        });
    }

    deleteItem(item) {
        this.onDeleteItem({
            $event: {data: item}
        });
    }

    getClientes(newPageNumber, oldPageNumber) {
        this.onPageChange({
            $event: {
                data: { newPageNumber, oldPageNumber }
            }
        });
    }
}

export default ClientesListController;
