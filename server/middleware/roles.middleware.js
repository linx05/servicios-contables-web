const ConnectRoles = require('connect-roles');
const combine = require('../services/middleware/combine-middleware');
const tokenMiddleware = require('./token_resource_match.middleware');

let user = new ConnectRoles({
    failureHandler: function (req, res, action) {
        // optional function to customise code that runs when
        // user fails authorisation
        let accept = req.headers.accept || '';
        res.status(403).json('Access Denied - You don\'t have permission to: ' + action);
    }
});
user.use('public', function () {
    return true;
});

user.use('cliente', function (req) {
    return (req.user.level === 'cliente' || req.user.level === 'empleado' || req.user.level === 'admin');
});

user.use('empleado', function (req) {
    return (req.user.level === 'cliente' || req.user.level === 'admin');
});

user.use('admin', (req) => {
    return req.user.level === 'admin'
});

user.use(function (req) {
    if (req.user.level === 'admin') {
        return true;
    }
});

module.exports = {
    rolesMiddleware: user.middleware,
    public         : combine([tokenMiddleware, user.can('public')]),
    user           : combine([tokenMiddleware, user.can('cliente')]),
    employee       : combine([tokenMiddleware, user.can('empleado')]),
    admin          : combine([tokenMiddleware, user.can('admin')])
};



