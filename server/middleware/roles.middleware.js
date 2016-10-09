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

user.use('user', function (req) {
    if (req.user.level === 'user' || req.user.interpreter === 'employee' || req.user.level === 'admin') return true;
});

user.use('employee', function (req) {
    if (req.user.level === 'employee' || req.user.level === 'admin') return true;
});

user.use(function (req) {
    if (req.user.level === 'admin') {
        return true;
    }
});

user.use('admin', (req) => req.user.level === 'admin');

module.exports = {
    rolesMiddleware: user.middleware,
    public         : combine([tokenMiddleware, user.can('public')]),
    user           : combine([tokenMiddleware, user.can('user')]),
    interpreter    : combine([tokenMiddleware, user.can('employee')]),
    admin          : combine([tokenMiddleware, user.can('admin')])
};



