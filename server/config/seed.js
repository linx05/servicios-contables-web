/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Cliente = require('../api/cliente/cliente.model');
var Cliente = require('./cliente.model');
let User = require('../api/user/user.model').User;
// Insert seed data below
var clienteSeed = require('../api/cliente/cliente.seed.json');
var clienteSeed = require('./cliente.seed.json');
let userSeed = require('../api/user/user.seed.json');

// Insert seed inserts below
Cliente.find({}).remove(function() {
	Cliente.create(clienteSeed);
});

User.find({}).remove(function () {
    User.create(userSeed);
});
