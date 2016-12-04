class ClientesController {
    constructor (ClientesService, ModalService) {
        this.clientesService = ClientesService;
        this.modal = ModalService;
        this.modalOptions = {
            component: '<recibos-edit></recibos-edit>',
            title: 'Cliente',
        };
    }

    $onInit () {

    }
    $onChanges (changes) {
        this.clientes = this.data;
    }

    filterClientes() {
        if (this.filterSearch.length < 1) this.clientes = this.data;
        else {
            this.clientes =_.filter(this.data, cliente => {
                return cliente.rfc.toLowerCase().includes(this.filterSearch.toLowerCase());
            });
        }
    }

    add (cuenta = null) {
        this.modalOptions.data = cuenta;
        return this.modal.show(this.modalOptions)
            .then(() => this.clientesService.get().then(data => this.clientes = this.data = data));
    }

    edit({ data }) {
        this.clientesService.find(data._id)
            .then((data) => {
                return this.add(data);
            });
    }

    delete({ data }) {
        this.clientesService.remove(data._id)
            .then(() => this.clientesService.get().then(data => this.clientes = this.data = data));

    }
}
ClientesController.$inject = ['ClientesService', 'ModalService'];

export default ClientesController;
