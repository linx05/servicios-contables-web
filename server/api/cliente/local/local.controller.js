'use strict';

let User = require('../cliente.model.js').User;

exports.validateAccount = function ({username, password}) {
    return new Promise(function (resolve, reject) {
        if (!username || !password || password.length < 8) reject();
        if (!username) resolve();
        User.findOne({
            'local': {
                $elemMatch: {
                    'field': 'username',
                    'value': username
                }
            }
        }, function (err, user) {
            resolve();
            if (!err) {
                if (user) return reject('User Exists');
                else return resolve();
            }
            return resolve();

        });
    });

};
