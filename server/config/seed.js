/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
let User = require('../api/user/user.model').User;
// Insert seed data below
let userSeed = require('../api/user/user.seed.json');

// Insert seed inserts below
User.find({}).remove(function () {
    User.create(userSeed);
});
