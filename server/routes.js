/**
 * Main application routes
 */
module.exports = function (app) {
    // Insert routes below
    app.use('/api/clientes', require('./api/cliente'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/auth', require('./api/auth')());
    app.use('/api/documentos', require('./api/documento'));
};
