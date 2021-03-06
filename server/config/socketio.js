/**
 * Socket.io configuration
 */

'use strict';

const socketioJwt = require('socketio-jwt');
const authConfig = require('./auth');
const config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
    console.info('[%s] DISCONNECTED', socket.address);
    socket.disconnect();
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/cliente/cliente.socket').register(socket);
  require('./cliente.socket').register(socket);
    require('../api/user/user.socket').register(socket);
}

module.exports = function (socketio) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    //add the authorization service to socket.io
    socketio.use(socketioJwt.authorize({
        secret   : authConfig.jwtSecret,
        handshake: true,
        callback : false
    }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
