const aqp = require('api-query-params');
const Documento = require('../documento/documento.model').Documento;
const Pago = require('./pago.model').Pago;
const Recibo = require('../recibo/recibo.model').Recibo;

function index (req, res) {
    req = handleRequest(req);
    const query = aqp.default(req.query);

    Documento.find(query.filter)
        .populate('user freight from to')
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

function show (req, res) {
    Documento.findById(req.params.id)
        .populate('user freight from to')
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
    let pag;
    return Pago.create(Object.assign({},data))
        .then(pago => {
            if (!pago) return handleError(res, null);
            pag = pago;
            return Recibo.findById(pago.recibo).exec()
        })
        .then(recibo => {
            recibo.saldo_pendiente -= pag.total;
            if(recibo.saldo_pendiente < 1) recibo.pagado = true;
            recibo.saldo_pendiente = Math.floor(recibo.saldo_pendiente);
            recibo.pagos.push(pag._id);
            return recibo.save();
        })
        .then(recibo => {
            return Documento.create({
                tipo: 'pago',
                fecha_generacion: Date.now(),
                pago: pag._id,
                cliente: recibo.cliente
            });
        })
        .then(data => {
            if (data) return res.status(201).json(data);
            else return handleError(res, null);
        })
        .catch(err => handleError(res, err));
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
    console.log(err);
    return res.status(code).send(err);
}

function handleRequest (req) {
    if (req.user.level === 'user') {
        req.query.user = req.user._id;
    }
    return req;
}

module.exports = {index, show, create, update, destroy};
