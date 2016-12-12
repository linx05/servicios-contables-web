'use strict';

const path = require('path');
const _ = require('lodash');
let dotenv = require('dotenv').config({silent: true});

function requiredProcessEnv (name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,


    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: process.env.SEED_DB ? eval(process.env.SEED_DB) : false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'api-secret'
    },

    DEFAULT_PASSWORD: process.env.DEFAULT_PWD || '12345678',

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
