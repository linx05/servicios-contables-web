export default class DocumentosListController {

    constructor (DocumentosService, RecibosService, ModalService) {
        'ngInject';
        this.documentosService = DocumentosService;
        this.recibosService = RecibosService;
        this.modal = ModalService;
        this.modalOptionsRecibo = {
            component: '<recibos-edit></recibos-edit>',
            title: 'Recibo'
        };
        this.modalOptionsPago = {
            component: '<pagos-edit></pagos-edit>',
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

    select ({data}) {
        this.selectedClient = data;
        this.enableAdd = true;
    }

}
