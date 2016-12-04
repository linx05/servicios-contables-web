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

    selectItem(item) {
        this.onSelectItem({
            $event: {data: item}
        });
    }
}

export default ClientesListController;
