'use strict';

let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
const moment = require('moment');

mongoose.plugin(uniqueValidator);

let firmaSchema = new Schema({
    fecha_vencimiento: {
        type: Date,
        required: true
    },
    fecha_notificacion: {
        type: Date
    },
    time_diff_cantidad  :{
        type: Number,
        required: true
    },
    time_diff_medida  :{
        type: String,
        required: true,
        enum: ['horas','dias']
    },
    notificacion_time_diff: {
        type: String,
    },
    cliente: {
        type: Schema.ObjectId,
        ref : 'Cliente',
        required: true
    },
    correo : {
      type: String
    },
    empleado: {
        type: Schema.ObjectId,
        ref : 'User',
        required: true
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

firmaSchema.pre('save', function (callback) {
    let firma = this;
    if (!firma.isModified('fecha_vencimiento')
        || !firma.isModified('time_diff_medida')
        || !firma.isModified('time_diff_cantidad')) return callback();
    if(firma.time_diff_medida == 'horas'){
        firma.fecha_notificacion = moment(firma.fecha_vencimiento).subtract(firma.time_diff_cantidad,'hours');
    }
    else {
        firma.fecha_notificacion = moment(firma.fecha_vencimiento).subtract(firma.time_diff_cantidad,'days');
    }
    firma.notificacion_time_diff= moment(firma.fecha_vencimiento).diff(firma.fecha_notificacion);
    callback();
});

module.exports = {
    Firma: mongoose.model('Firma', firmaSchema),
    FirmaSchema: firmaSchema
};
