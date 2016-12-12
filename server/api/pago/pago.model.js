'use strict';

let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

mongoose.plugin(uniqueValidator);

let pagoSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    recibo: {
        type: Schema.ObjectId,
        ref: 'Firma',
        required: true
    },
    cfd : {
        type: Number
    },
    saldo_anterior: {
        type: Number,
        required: true
    },
    saldo_posterior: {
        type: Number,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});
const autoIncrement = require('mongoose-auto-increment');

pagoSchema.plugin(autoIncrement.plugin,{model:'Pago',field:'cfd',startAt:1});

pagoSchema.path('total').get(num=>{
    return +(num).toFixed(2);
});

module.exports = {
    Pago: mongoose.model('Pago', pagoSchema),
    PagoSchema: pagoSchema
};
