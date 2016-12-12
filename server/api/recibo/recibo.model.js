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
    cfd : {
        type: Number
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

const autoIncrement = require('mongoose-auto-increment');

reciboSchema.plugin(autoIncrement.plugin,{model:'Firma',field:'cfd',startAt:1});

function toRound2(num) {
    return +(num).toFixed(2);
}

reciboSchema.path('subtotal').get(toRound2);
reciboSchema.path('iva').get(toRound2);
reciboSchema.path('total').get(toRound2);
reciboSchema.path('saldo_pendiente').get(toRound2);

module.exports = {
    Recibo: mongoose.model('Firma', reciboSchema),
    ReciboSchema: reciboSchema
};
