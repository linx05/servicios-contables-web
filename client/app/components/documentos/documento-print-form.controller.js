let form;

class ReciboPrintFormController {
    constructor () {
        'ngInject';
    }

    $onInit () {
    }

    $onChanges (changes) {
        if (changes.data) {
            this.documento = Object.assign({}, this.data.documento);
            this.cliente = Object.assign({}, this.data.cliente);
        }
    }

    print() {
        window.print();
    }
}
export default ReciboPrintFormController;
