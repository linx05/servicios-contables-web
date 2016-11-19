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

    }
    $onChanges (changes) {
        if(changes.data){
            this.data = this.filter(this.data);
        }
    }
    filter(data) {
        return _.filter(data, cuenta => {
            return cuenta.level === 'empleado';
        });
    }

    add (cuenta = null) {
        this.modalOptions.data = cuenta;
        return this.modal.show(this.modalOptions)
            .then(() => this.cuentasService.get().then(data => this.data = this.filter(data)));
    }

    edit({ data }) {
        this.cuentasService.find(data._id)
            .then((data) => {
                return this.add(data);
            });
    }

    delete({ data }) {
        this.cuentasService.remove(data._id)
            .then(() => this.cuentasService.get().then(data => this.data = this.filter(data)));

    }
}
CuentasController.$inject = ['CuentasService', 'ModalService'];

export default CuentasController;
