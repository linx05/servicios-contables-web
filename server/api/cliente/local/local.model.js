'use strict';

const User = require('../cliente.model.js').User;
const Schema = mongoose.Schema;

const LocalAccountSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String, select: false}
});


LocalAccountSchema.statics.validateAccount = function ({username, password}) {
    return new Promise(function (resolve, reject) {
        if (!username || !password || password.length < 8)return reject();
        if (!username)return resolve();
        return User.find({
            'cuenta': {
                $elemMatch: {
                    'field': 'username',
                    'value': username
                }
            }
        }).exec()
        .then(()=> {
            return reject('User Exists');
        })
        .catch((err) => {
            return resolve();
        })
    });

};

module.exports = mongoose.model('Local', LocalAccountSchema);


