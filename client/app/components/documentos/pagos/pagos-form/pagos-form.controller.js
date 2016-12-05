let form;

class RecibosFormController {
    constructor () {
        'ngInject';
        this.repeatConcepto = [0];
    }

    $onInit () {
        this.max = 1000000;
    }

    $onChanges (changes) {
        if (changes.data) {
            this.data = Object.assign({pago: {total: 0}}, this.data);
        }

        if (changes.event) {
            this.event = Object.assign({}, this.event);
            if (this.event.event === 'OK') this.onSubmit();
        }
    }

    calculateMax() {
        if(this.data.pago.recibo){
            this.max = this.data.pago.recibo.saldo_pendiente || this.max;
            console.log(this.max);
        }
    }

    setForm (f) {
        form = f;
    }


    onSubmit () {
        if (form.$invalid) return form.$setSubmitted();
        this.onSave({
            $event: {data: this.data}
        });
    }
}
export default RecibosFormController;
