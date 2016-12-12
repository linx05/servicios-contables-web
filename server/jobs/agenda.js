const notificationJob = require('./notification.job');
module.exports = (mongoConnection) => {
    const Agenda = require('agenda');

    let agenda = new Agenda({db: {address: config.mongo.uri, collection: 'jobs'}});

    agenda.define('greet the world', function(job, done) {
        console.log(job.attrs.data.time, 'hello world!');
        done();
    });

    agenda.define('enviar recordatorios', function(job, done) {
        console.log('Revisando Recordatorios',Date.now());
        notificationJob.notification(job,done);
    });
    
    agenda.on('ready',function () {
        console.log('Listo para enviar recordatorios!');
        agenda.every('30 seconds', 'enviar recordatorios');
        agenda.start();
    });

};



