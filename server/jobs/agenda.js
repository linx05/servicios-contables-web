const notificationJob = require('./notification.job');
module.exports = (mongoConnection) => {
    const Agenda = require('agenda');

    let agenda = new Agenda({db: {address: config.mongo.uri, options: config.mongo.options, collection: 'jobs'}});

    agenda.define('greet the world', function(job, done) {
        console.log(job.attrs.data.time, 'hello world!');
        done();
    });

    agenda.define('enviar recordatorios', function(job, done) {
        console.log('Revisando Recordatorios');
        notificationJob.notification(job,done);
        done();
    });

    agenda.on('ready',function () {
        agenda.schedule('in 2 minutes', 'enviar recordatorios');
        agenda.start();
    });

};



