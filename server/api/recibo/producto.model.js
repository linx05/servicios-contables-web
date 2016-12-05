'use strict';

let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

mongoose.plugin(uniqueValidator);

let productoSchema = new Schema({
    cantidad: {
        type: Number,
        required: true
    },
    concepto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    iva: {
        type: Number,
        required: true
    },
    importe: {
        type: Number,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = {
    Producto: mongoose.model('Producto', productoSchema),
    ProductoSchema: productoSchema
};
