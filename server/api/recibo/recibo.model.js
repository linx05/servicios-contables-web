'use strict';

let uniqueValidator = require('mongoose-unique-validator');
const productoSchema = require('./producto.model').ProductoSchema;
let Schema = mongoose.Schema;

mongoose.plugin(uniqueValidator);

let reciboSchema = new Schema({
    subtotal: {
        type: Number
    },
    iva: {
        type: Number
    },
    total: {
        type: Number,
        required: true
    },
    saldo_pendiente: {
        type: Number,
        required: true
    },
    pagado: {
        type: Boolean,
        required: true,
        default: false
    },
    cliente: {
        type: Schema.ObjectId,
        ref : 'Cliente',
        required: true
    },
    pagos: [{
        type: Schema.ObjectId,
        ref : 'Pago'
    }],
    productos: [productoSchema]

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = {
    Recibo: mongoose.model('Recibo', reciboSchema),
    ReciboSchema: reciboSchema
};
