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
        ref: 'Pago',
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = {
    Pago: mongoose.model('Pago', pagoSchema),
    PagoSchema: pagoSchema
};
