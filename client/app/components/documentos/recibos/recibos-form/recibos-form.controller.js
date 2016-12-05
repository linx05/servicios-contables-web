let form;

class RecibosFormController {

    constructor () {
        this.repeatConcepto = [0];
    }

    $onInit () {
    }

    $onChanges (changes) {
        if (changes.data) {
            this.data = Object.assign({
                concepto: [{cantidad: 1, iva: 16, precio: 0}],
                totales: {total: 0, subtotal: 0, iva: 0}
            }, this.data);
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
        this.calcularTotales();
    }

    calcularTotales () {
        this.data.totales = _.reduce(this.data.concepto, (obj, producto) => {
            obj.subtotal += producto.precio;
            obj.iva += +(producto.precio * (producto.iva / 100)).toFixed(2);
            obj.total += producto.precio + (producto.precio * (producto.iva / 100));
            return obj;
        }, {total: 0, subtotal: 0, iva: 0});
    }

    onSubmit () {
        this.onSave({
            $event: {data: this.data}
        });
    }
}
RecibosFormController.$inject = [];
export default RecibosFormController;
