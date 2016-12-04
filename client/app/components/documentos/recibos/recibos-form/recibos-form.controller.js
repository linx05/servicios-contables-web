let form;

class RecibosFormController {

    constructor () {
        this.repeatConcepto = [0];
    }

    $onInit () {
    }

    $onChanges (changes) {
        if (changes.data) {
            this.data = Object.assign({concepto: [{cantidad: 1, iva: 16, precio: 0}]}, this.data);
        }

        if (changes.event) {
            this.event = Object.assign({}, this.event);
            if (this.event.event === 'OK') this.onSubmit();
        }
    }

    addConcepto () {
        this.repeatConcepto.push(this.repeatConcepto.length);
        this.data.concepto.push({cantidad: 1, iva: 16, precio: 0});
    }

    removeConcepto (index) {
        if (this.repeatConcepto.length > 1) {
            this.repeatConcepto.splice(index, 1);
            this.data.concepto.splice(index, 1);
        }
    }

    calcularImporte (index) {
        this.data.concepto[index].importe = +(this.data.concepto[index].precio +
            (this.data.concepto[index].precio * (this.data.concepto[index].iva/100))).toFixed(2);
    }

    onSubmit () {
        this.onSave({
            $event: {data: this.data}
        });
    }
}
RecibosFormController.$inject = [];
export default RecibosFormController;
