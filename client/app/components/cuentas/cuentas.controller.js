class CuentasController {
    constructor (CuentasService, ModalService) {
        this.cuentasService = CuentasService;
        this.modal = ModalService;
        this.modalOptions = {
            component: '<cuentas-edit></cuentas-edit>',
            title: 'Cuentas',
        };
    }

    $onInit () {
        this.cuentasService.get()
            .then(cuentas => {
                this.cuentas = _.filter(cuentas, cuenta => {
                    return cuenta.level === 'empleado';
                });
            });
    }

    add (account = null) {
        this.modalOptions.data = account;
        return this.modal.show(this.modalOptions)
            .then(() => this.cuentasService.get().then(data => this.data = data));
    }
}
CuentasController.$inject = ['CuentasService', 'ModalService'];

export default CuentasController;
