export default class DocumentosController {

    constructor (DocumentosService, ModalService) {
        'ngInject';
        this.documentosService = DocumentosService;
        this.modal = ModalService;
        this.modalOptions = {
            component: '<recibos-edit></recibos-edit>',
            title: 'Recibo'
        };
    }

    $onChanges (changes) {
        this.clientes = this.data.clientes;
        this.documentos = this.data.documentos;
    }

    $onInit () {
    }

    select ({data}) {
        this.selectedClient = data;
        this.enableAdd = true;
    }

    filterClientes() {
        if (this.filterSearch.length < 1) this.clientes = this.data.clientes;
        else {
            this.clientes =_.filter(this.data.clientes, cliente => {
                return cliente.rfc.toLowerCase().includes(this.filterSearch.toLowerCase());
            });
        }
    }

    add (type) {
        this.modalOptions.data = {
            cliente: this.selectedClient
        };
        return this.modal.show(this.modalOptions)
            .then(() => this.clientesService.get().then(data => data));
    }

    edit (documentos = {}) {
        this.modalOptions.data = documentos;
        this.modalOptions.stateParams.id = documentos._id ? documentos._id : 'add';
        this.modal.show(modalOptions);
    }

    findAndEdit ({data}) {
        this.documentosService.find(data._id).then(data => this.edit(data));
    }

    remove ({data}) {
        this.modalOptions.id = data._id;
        this.modalOptions.service = this.documentosService;
        this.modal.warn(modalOptions);
    }

}
