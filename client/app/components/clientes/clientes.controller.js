class CuentasController {
    constructor (ClientesService, ModalService) {
        this.cuentasService = ClientesService;
        this.modal = ModalService;
        this.modalOptions = {
            component: '<clientes-edit></clientes-edit>',
            title: 'Cliente',
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
        return data;
        // return _.filter(data, cuenta => {
        //     return cuenta.level === 'empleado';
        // });
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
CuentasController.$inject = ['ClientesService', 'ModalService'];

export default CuentasController;
