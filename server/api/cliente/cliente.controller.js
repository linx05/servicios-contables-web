'use strict';

const Cliente = require('./cliente.model').Cliente;
const User = require('../user/user.model').User;

const claveDefecto = config.DEFAULT_PASSWORD;

exports.index = function (req, res) {
    Cliente.find({}, function (err, clientes) {
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
    let cliente = new Cliente(Object.assign({}, request.datos_basicos, {esquema_pago: request.esquema_pago}, {contacto: request.contacto}));
    cliente.perfil = request.perfil;
    let local = {
        username: request.usuario || request.datos_basicos.rfc,
        password: request.datos_basicos.rfc.toLowerCase()
    };
    User.create({
        full_name: request.datos_basicos.razon_social,
        email: request.contacto.email,
        level: 'cliente',
        cuenta: local,
        active: true,
    }, (err, user) => {
        if (err) {
            return handleError(res, err);
        }
        cliente.id_user = user._id;
        cliente.save((err, cliente) => {
            if (err) {
                return handleError(res, err);
            }
            return res.status(201).json({user, cliente});
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
        let updated = _.merge(cliente, req.body.datos_basicos);
        updated = Object.assign({},cliente, updated, req.body);
        updated.save(function (err,client) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(client);
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
        User.findById(cliente.id_user, (err, user) => {
            if (err) {
                return handleError(res, err);
            }
            if (!user) {
                return res.status(404).send('Not Found Documento');
            }
            cliente.remove(function (err) {
                user.remove();
                if (err) {
                    return handleError(res, err);
                }
                return res.status(204).send('No Content');
            });
        });

    });
};

function handleError (res, err, code = 400) {
    return res.status(code).send(err);
}
