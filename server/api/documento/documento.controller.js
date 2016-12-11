const aqp = require('api-query-params');
const Cliente = require('../cliente/cliente.model').Cliente;
const Documento = require('./documento.model').Documento;

function index (req, res) {
    if(req.user.level==='cliente') {
        let client;
        return Cliente.findOne({'id_user': new mongoose.Types.ObjectId(req.user._id)})
            .exec()
            .then(cliente => {
                if(!cliente) return Promise.reject();
                client = cliente;
                return Documento.find({'cliente':cliente._id})
                    .populate({
                        path: 'pago',
                        populate : {
                            path: 'recibo',
                            model: 'Recibo'
                        }
                    })
                    .populate({
                        path: 'recibo',
                        populate: {
                            path: 'pagos',
                            model: 'Pago'
                        }
                    })
                    .exec()
            })
            .then(documentos => {
                return res.status(200).json({documentos,cliente:client});
            })
            .catch(err => {
                console.log(err);
                return handleError(res, err)
            });

    }
    else {
        const query = aqp.default(req.query);
        Documento.find(query.filter)
            .populate('recibo pago cliente')
            .skip(query.skip)
            .limit(query.limit)
            .sort(query.sort)
            .exec((err, data) => {
                if (err) {
                    return handleError(res, err);
                }

                return res.status(200).json(data);
            });
    }
}

function show (req, res) {
    Documento.findById(req.params.id)
        .populate('recibo pago cliente')
        .exec(function (err, data) {
            if (err) {
                return handleError(res, err);
            }

            if (!data) {
                return res.status(404).send('Not Found');
            }

            return res.json(data);
        });
}

function create (req, res) {
    const data = req.body;

    return Documento.create({
        tipo: data.tipo,
        fecha_generacion: Date.now(),
        pago: data.pago,
        recibo: data.recibo
    }).then(data => {
        if (data) return res.status(201).json(data);
        else return handleError(res, null);
    }).catch(err => handleError(res, err));
}

function update (req, res) {
    if (req.body._id) delete req.body._id;

    Documento.findById(req.params.id, function (err, documento) {
        if (err) {
            return handleError(res, err);
        }

        if (!documento) {
            return res.status(404).send('Not Found');
        }

        delete req.body.events;
        let updated = Object.assign(documento, req.body);

        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(documento);
        });
    });
}

function destroy (req, res) {
    Documento.findById(req.params.id, function (err, documento) {
        if (err) {
            return handleError(res, err);
        }
        if (!documento) {
            return res.status(404).send('Not Found');
        }
        documento.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
}

function getError (name) {
    const error = {message: '', name: 'ValidationError', errors: {}};

    if (name === 'user') {
        error.message = 'User level invalid';
        error.errors = {user: {}};
    }
    else if (name === 'freight') {
        error.message = 'Documento box is unavailable';
        error.errors = {freight: {}};
    }

    return error;
}

function handleError (res, err, code = 400) {
    return res.status(code).send(err);
}

module.exports = {index, show, create, update, destroy};
