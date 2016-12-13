export default class DocumentosListController {

    constructor (ModalService) {
        'ngInject';
        this.modal = ModalService;
        this.modalPagosOptions = {
            component: '<pagos-print-form></pagos-print-form>',
            save: false
        };
        this.modalRecibosOptions = {
            component: '<recibos-print-form></recibos-print-form>',
            save: false
        };
    }

    $onChanges (changes) {
        if(changes.data) {
            this.documentos = Object.assign([],this.data.documentos);
            this.saldos = Object.assign({}, this.data.saldos);
            this.cliente = Object.assign({}, this.data.cliente);
        }

    }

    $onInit () {
    }

    view ({data}) {
        let modal;
        if(data.tipo === 'pago'){
            modal = this.modalPagosOptions;
        }
        else {
            modal = this.modalRecibosOptions;
        }
        modal.data = {
            documento: data,
            cliente: this.cliente
        };
        this.modal.show(modal);
    }

}
