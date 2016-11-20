class ClientesController {
    constructor (ClientesService, ModalService) {
        this.clientesService = ClientesService;
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
            .then(() => this.clientesService.get().then(data => this.data = this.filter(data)));
    }

    edit({ data }) {
        this.clientesService.find(data._id)
            .then((data) => {
                return this.add(data);
            });
    }

    delete({ data }) {
        this.clientesService.remove(data._id)
            .then(() => this.clientesService.get().then(data => this.data = this.filter(data)));

    }
}
ClientesController.$inject = ['ClientesService', 'ModalService'];

export default ClientesController;
