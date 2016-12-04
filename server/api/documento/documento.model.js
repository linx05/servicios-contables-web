'use strict';

let uniqueValidator = require('mongoose-unique-validator');
const reciboSchema = require('./recibo.model').ReciboSchema;
const pagoSchema = require('./pago.model').PagoSchema;
let Schema = mongoose.Schema;

mongoose.plugin(uniqueValidator);

let documentoSchema = new Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['pago','recibo']
    },
    fecha_generacion: {
        type: Date,
        required: true
    },
    pago: reciboSchema,
    recibo: reciboSchema


}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = {
    Documento: mongoose.model('Documento', documentoSchema),
    DocumentoSchema: documentoSchema
};
