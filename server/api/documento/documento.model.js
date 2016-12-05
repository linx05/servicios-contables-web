'use strict';

let uniqueValidator = require('mongoose-unique-validator');
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
    pago: {
        type: Schema.ObjectId,
        ref: 'Pago'
    },
    recibo: {
        type: Schema.ObjectId,
        ref: 'Recibo'
    }


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
