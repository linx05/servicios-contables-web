const aqp = require('api-query-params');
const Firma = require('./firma.model.js').Firma;
const moment = require('moment');

function index (req, res) {
    const query = aqp.default(req.query);

    Firma.find(Object.assign({},query.filter,{empleado: req.user._id}))
        .populate('cliente empleado')
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
    console.log(req.params);
    Firma.findById(req.params.id)
        .populate('cliente empleado')
        .exec(function (err, data) {
            if (err) {
                return handleError(res, err);
            }

            if (!data) {
                return res.status(404).send('Not Found');
            }

            return res.status(200).json(data);
        });
}

function create (req, res) {
    const data = req.body;
    return Firma.create(Object.assign({},data))
        .then(data => {
            if (data) return res.status(201).json(data);
            else return handleError(res, null);
        })
        .catch(err => handleError(res, err));
}

function update (req, res) {
    if (req.body._id) delete req.body._id;

    Firma.findById(req.params.id, function (err, firma) {
        if (err) {
            return handleError(res, err);
        }

        if (!firma) {
            return res.status(404).send('Not Found');
        }

        delete req.body.events;
        let updated = Object.assign(firma, req.body);

        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(firma);
        });
    });
}

function destroy (req, res) {
    Firma.findById(req.params.id, function (err, firma) {
        if (err) {
            return handleError(res, err);
        }
        if (!firma) {
            return res.status(404).send('Not Found');
        }
        firma.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
}

function handleError (res, err, code = 400) {
    return res.status(code).send(err);
}

module.exports = {index, show, create, update, destroy};
