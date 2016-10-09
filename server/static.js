let levelsMiddleware = require('./middleware/roles.middleware');

module.exports = function (app) {

    //setup static content
    app.use('/public', express.static(path.join(__dirname, 'public')));

    //Web Application and Own Assets
    app.use('/', express.static(path.join(__dirname, '../dist')));
    app.use('/assets', express.static(path.join(__dirname, '../client/assets')));


    //Additional API static
    //require('./api/download/download')(app, config, levelsMiddleware);
};
