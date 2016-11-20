class ClientesListController {
    constructor () {
        this.pageSize = 20;
    }

    $onChanges(changes) {
        if (changes.clientes) {
            this.clientes = Object.assign({}, this.clientes);
        }
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

    getCuentas(newPageNumber, oldPageNumber) {
        this.onPageChange({
            $event: {
                data: { newPageNumber, oldPageNumber }
            }
        });
    }
}

export default ClientesListController;
