let connect = require('connect'); // we require connect

module.exports = function (mids) {
    var chain = connect();
    mids.forEach(function (middleware) {
        chain.use(middleware);
    });
    return chain;
};
