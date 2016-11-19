class cuentasListController {
    constructor () {
        this.pageSize = 20;
    }

    $onChanges(changes) {
        if (changes.cuentas) {
            this.cuentas = Object.assign({}, this.cuentas);
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

export default cuentasListController;
