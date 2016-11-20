'use strict';

const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const LocalAccount = require('./local/local.model');

mongoose.plugin(uniqueValidator);

let contactoSchema = new Schema({
    nombre_contacto: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    observaciones: {
        type: String
    }
});

let esquemaPagoSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    periocidad: {
        type: String,
        required: true,
        enum: ['mensual', 'bimestral', 'trimestral', 'cuatrimestral', 'semestral', 'anual']
    }
});

let obligacionSchema = new Schema({
    obligaciones: {
        type: String,
        required: true,
        enum: []
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_final: {
        type: Date,
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
    typo_obligacion: {
        type: String,
        required: true,
        enum: ['pago_definitivo_mensual',
            'declaracion_informativa_mensual', 'declaracion_informativa_anual',
            'pago_provisional_mensual', 'declaracion_anual']
    }
});

let perfilSchema = new Schema({
    regimen_fiscal: {
        type: String,
        required: true,
        enum: []
    },
    actividad_principal: {
        type: String,
        required: true,
        enum: []
    }
});

let clienteSchema = new Schema({
    rfc: {
        type: String,
        required: true
    },
    razon_social: {
        type: String,
        required: true
    },
    domicilio: {
        type: String
    },
    id_user: {
        type: String
    },
    contacto: contactoSchema,
    esquema_pago: esquemaPagoSchema,
    perfil: [perfilSchema],

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

clienteSchema.plugin(uniqueValidator);

clienteSchema.pre('save', function (callback) {
    let user = this;
    // Break out if the password hasn't changed
    if (!user.isModified('cuenta.password')) return callback();

    // Password changed so we need to hash it
    user.cuenta.password = clienteSchema.statics.generateHash(user.cuenta.password);
    callback();
});

// generating a hash
clienteSchema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
clienteSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.cuenta.password);
};

module.exports = {
    Cliente: mongoose.model('Cliente', clienteSchema),
    UserSchema: clienteSchema,
    accounts: {
        LocalAccount: LocalAccount
    }
};
