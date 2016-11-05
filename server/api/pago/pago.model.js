'use strict';

let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

mongoose.plugin(uniqueValidator);

let schemaPagoSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    periocidad_valor: {
        type: Number,
        required: true
    },
    periocidad_rango: {
        type: String,
        required: true,
        enum: ['mensual', 'bimestral', 'trimestral', 'cuatrimestral', 'semestral', 'anual']
    },
    fecha_generacion: {
        type: Date,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = {
    User: mongoose.model('Pago', schemaPagoSchema),
    UserSchema: schemaPagoSchema
};
