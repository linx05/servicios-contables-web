class cuentasListController {
    constructor () {
        this.pageSize = 20;
    }
    $onChanges(changes) {
        if (changes.cuentas) {
            this.cuentas = Object.assign({}, this.cuentas);
        }
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
