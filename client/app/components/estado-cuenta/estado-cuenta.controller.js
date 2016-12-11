export default class DocumentosListController {

    constructor (DocumentosService, RecibosService, ModalService) {
        'ngInject';
        this.documentosService = DocumentosService;
        this.recibosService = RecibosService;
        this.modal = ModalService;
        this.modalOptions = {
            component: '<pagos-print-form></pagos-print-form>',
            title: 'Pago'
        };
    }

    $onChanges (changes) {
        if(changes.data) {
            this.documentos = Object.assign([],this.data.documentos);
            this.saldos = Object.assign({}, this.data.saldos);
        }

    }

    $onInit () {
    }

    view ({data}) {
        this.modalOptions.data = {
            documento: data
        };
        this.modal.show(this.modalOptions);
    }

}
