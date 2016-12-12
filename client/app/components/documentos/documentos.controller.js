export default class DocumentosController {

    constructor (DocumentosService, RecibosService, ModalService, toastr) {
        'ngInject';
        this.documentosService = DocumentosService;
        // this.pagosService = PagosService;
        this.recibosService = RecibosService;
        this.toastr = toastr;
        this.modal = ModalService;
        this.modalOptionsRecibo = {
            component: '<recibos-edit></recibos-edit>',
            title: 'Firma'
        };
        this.modalOptions = {
            component: '<pagos-edit></pagos-edit>',
            title: 'Pago'
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
        this.modalToShow = this.modalOptionsRecibo;
        if(type == 'pago') this.modalToShow = this.modalOptions;

        this.modalToShow.data = {
            cliente: this.selectedClient
        };
        if(type == 'pago') {
            this.recibosService.builder
                .where('pagado', '=', false)
                .where('cliente', '=', this.selectedClient._id)
                .build()
                .then(recibos => {
                    if(recibos.length>0) {
                        this.modalToShow.data = Object.assign({},this.modalToShow.data, {recibos});
                        this.modal.show(this.modalToShow)
                            .then(() => this.documentosService.get().then(data => data));
                    }
                    else {
                        this.toastr.error('El cliente no tiene ninguna cuenta pendiente!');
                    }
                })
        }
        else return this.modal.show(this.modalToShow)
            .then(() => this.documentosService.get().then(data => data));
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
