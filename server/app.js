/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
global.path = require('path');
global.express = require('express');
global.mongoose = require('mongoose');
global.config = require('./config/environment');
global._ = require('lodash');
const bodyParser = require('body-parser');
// Use native promises for mongoose
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

//Middleware
const auth = require('./services/auth/passport-jwt')();
const levelsMiddleware = require('./middleware/roles.middleware');

// Setup server
let app = express();

//enable CORS for our app
app.use(require('cors')());

// get our request parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Add passport to application
app.use(auth.initialize());
//Add permission middleware to application
// app.use(levelsMiddleware.rolesMiddleware());

let server = require('http').createServer(app);
let socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);
require('./static')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
