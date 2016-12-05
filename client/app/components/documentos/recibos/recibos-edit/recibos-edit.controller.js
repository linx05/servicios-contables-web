let documentos;

export default class recibosEditController {

    constructor (RecibosService) {
        'ngInject';
        documentos = RecibosService;
    }

    $onInit () {
        this.error = false;
    }

    $onChanges (changes) {
        if (changes.data) {
            this.data = Object.assign({}, this.data);
        }

        if (changes.event) {
            // If an event occurs must not be reassigned here
            // because will cause a duplication of the said event
            // this.event = Object.assign({}, this.event);
        }
    }

    save ({data}) {
        let recibo = _.reduce(data.concepto, (obj, producto) => {
            obj.subtotal += producto.precio;
            obj.iva += (producto.precio * (producto.iva / 100));
            obj.total += producto.precio + (producto.precio * (producto.iva / 100));
            return obj;
        }, {total: 0, subtotal: 0, iva: 0});
        const recibosData = {
            subtotal: recibo.subtotal,
            iva: recibo.iva,
            total: recibo.total,
            saldo_pendiente: recibo.total,
            cliente: this.data.cliente._id,
            productos: data.concepto
        };
        const operation = data._id ? documentos.edit(data._id, recibosData)
            : documentos.add(recibosData);

        this.error = false;
        this.onToggle();

        return operation
            .then(() => this.onAccept())
            .catch(error => this.error = true)
            .finally(() => this.onToggle());
    }
}
