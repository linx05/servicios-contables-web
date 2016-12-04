'use strict';

let uniqueValidator = require('mongoose-unique-validator');
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
