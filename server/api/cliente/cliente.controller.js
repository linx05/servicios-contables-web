'use strict';

var _ = require('lodash');
const Cliente = require('./cliente.model').Cliente;
const User = require('../user/user.model').User;

const claveDefecto = config.DEFAULT_PASSWORD || '123456780';

exports.index = function (req, res) {
    Cliente.find(function (err, clientes) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(clientes);
    });
};

exports.show = function (req, res) {
    Cliente.findById(req.params.id, function (err, cliente) {
        if (err) {
            return handleError(res, err);
        }
        if (!cliente) {
            return res.status(404).send('Not Found');
        }
        return res.json(cliente);
    });
};

// Crea un nuevo cliente el la DB.
exports.create = function (req, res) {
    const request = req.body;
    let local = {
        username: request.usuario || undefined,
        password: request.clave || claveDefecto
    };
    let cliente = new Cliente(Object.assign({}, request.datos_basicos, {contacto: request.contacto}));
    if (request.perfil && request.obligaciones) {
        cliente.perfil = request.perfil;
        cliente.perfil.obligaciones.push(request.obligaciones);
    }

    cliente.save((err, cliente)=> {
        if (err) {
            return handleError(res, err);
        }
        User.create({
            full_name: request.datos_basicos.razon_social,
            email: request.datos_basicos.email,
            level: 'user',
            cuenta: local,
            active: false,
        }, (err, user)=> {
            if (err) {
                return handleError(res, err);
            }
            return res.status(201).json({user,cliente});
        });
    });
};

// Updates an existing cliente in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Cliente.findById(req.params.id, function (err, cliente) {
        if (err) {
            return handleError(res, err);
        }
        if (!cliente) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(cliente, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(cliente);
        });
    });
};

exports.destroy = function (req, res) {
    Cliente.findById(req.params.id, function (err, cliente) {
        if (err) {
            return handleError(res, err);
        }
        if (!cliente) {
            return res.status(404).send('Not Found');
        }
        cliente.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError (res, err) {
    return res.status(500).send(err);
}
