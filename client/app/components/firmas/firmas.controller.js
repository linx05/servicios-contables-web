export default class FirmasController {

    constructor (DocumentosService, RecibosService, ModalService, toastr) {
        'ngInject';
        this.documentosService = DocumentosService;
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
        this.documentos = this.data;
    }

    $onInit () {
    }

    select ({data}) {
        this.selectedClient = data;
        this.enableAdd = true;
    }

    filterClientes(campo, search) {
        if (search.length < 1) this.documentos = this.data;
        else {
            if (campo == 'cfd'){
                this.documentos =_.filter(this.data, documento => {
                    return documento.cfd == search;
                });
            }
            else {
                this.documentos =_.filter(this.data, documento => {
                    return documento.cliente.rfc.toLowerCase().includes(search.toLowerCase())
                        || documento.cliente.razon_social.toLowerCase().includes(search.toLowerCase());
                });
            }

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
                            .then(() => this.clientesService.get().then(data => data));
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
