import moment from 'moment';

export default class FirmasController {
    constructor (AuthService, ClientesService, CuentasService, FirmasService, ModalService) {
        'ngInject';
        this.moment = moment;
        this.authService = AuthService;
        this.clientesService = ClientesService;
        this.cuentasService = CuentasService;
        this.firmasService = FirmasService;
        this.modal = ModalService;
        this.modalOptions = {
            component: '<firmas-edit></firmas-edit>',
            title: 'Firmas',
        };
    }

    $onInit () {

    }
    $onChanges (changes) {
        if(changes.data){
            this.data = Object.assign({}, this.data);
        }
    }

    add (firma = null) {
        let clients;
        return this.clientesService.get()
            .then(clientes => {
                clients = clientes;
                return this.cuentasService.find(this.authService.getId())
            })
            .then(cuenta => {
                this.modalOptions.data = {
                    firma,
                    cuenta,
                    clientes: clients
                };
                return this.modal.show(this.modalOptions)
                    .then(() => this.firmasService.get().then(data => this.data = data));
            });
    }

    edit({ data }) {
        this.firmasService.find(data._id)
            .then((data) => {
                return this.add(data);
            });
    }

    delete({ data }) {
        this.firmasService.remove(data._id)
            .then(() => this.firmasService.get().then(data => this.data = data));

    }
}
