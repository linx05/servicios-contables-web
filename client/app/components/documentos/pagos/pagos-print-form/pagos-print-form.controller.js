let form;

class PagosPrintFormController {
    constructor () {
        'ngInject';
    }

    $onInit () {
    }

    $onChanges (changes) {
        if (changes.data) {
            this.data = Object.assign({}, this.data);
        }
    }
}
export default PagosPrintFormController;
