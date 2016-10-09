'use strict';
let auth = require('../../services/auth/passport-jwt')();

exports = module.exports = ()=> {
    let controller = require('./auth.controller')();

    let router = express.Router();

    router.get('/', auth.authenticate(), controller.all);
    router.post('/token', controller.token);

    return router;
};
