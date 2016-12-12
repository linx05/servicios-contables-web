'use strict';

const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
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
    cliente: {
      type: Schema.ObjectId,
        ref: 'Cliente'
    },
    pago: {
        type: Schema.ObjectId,
        ref: 'Pago'
    },
    recibo: {
        type: Schema.ObjectId,
        ref: 'Firma'
    },
    cfd : {
        type: Number
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

documentoSchema.plugin(autoIncrement.plugin,{model:'Documento',field:'cfd',startAt:1});

module.exports = {
    Documento: mongoose.model('Documento', documentoSchema),
    DocumentoSchema: documentoSchema
};
