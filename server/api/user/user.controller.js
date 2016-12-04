'use strict';

let User = require('./user.model').User;
const claveDefecto = config.DEFAULT_PASSWORD || '12345';

// Get list of Documento
exports.index = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(users);
    });
};

// Get a single user
exports.show = function (req, res) {
    User.findById(req.params.userId).select('+cuenta.username').exec()
        .then((user) => {
            if (!user) {
                return res.status(404).send('Not Found');
            }
            return res.status(200).json(user);
        }).catch(err => {
        if (err) {
            return handleError(res, err);
        }
    });

};

exports.createLocalAccount = (req, res) => {
    const request = req.body;
    let local = {
        username: request.username || undefined,
        password: request.password || claveDefecto
    };
    let user = new User({
        full_name: request.full_name,
        email: request.email,
        level: request.level,
        local: local
    });
    return user.save(function (err, user) {
        if (!err) return res.status(201).json(user);
        return handleError(res, err, 422);
    });
};

// Updates an existing user in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        let updated = _.merge(user, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(user);
        });
    });
};

// Deletes a user from the DB.
exports.destroy = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.status(404).send('Not Found');
        }
        user.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError (res, err, code = 500) {
    console.log(err);
    return res.status(code).send(err);
}
