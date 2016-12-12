const Firma = require('../api/firma/firma.model').Firma;
const mailService = require('../services/mail/mailer.service');
const moment = require('moment');
function checkFirmaSchedule (job, done) {
    Firma.find({
        'fecha_notificacion': {
            $lt: moment().add(5, 'hours').toDate(),
            $gt: moment().substract(5, 'hours').toDate()
        },
        'enviado':false
    })
        .populate('cliente empleado')
        .exec()
        .then(firmas => {
            if (!firmas) done();
            let count = 0;
            return _.map(firmas, firma => {
                let correo = {
                    subject: 'Recordatorio de Vencimiento de Firma',
                    to: firma.correo,
                    html: `<p>La firma del cliente "${firma.cliente.razon_social}" esta proxima a vencer <strong>${firma.fecha_vencimiento}</strong></p>`
                };
                firma.enviado = true;
                mailService.send(correo);
                return firma.save(function(err){
                    count++;
                    if( count == firmas.length ){
                        done();
                    }
                });
            });
        })
        .catch((err) => {
            console.log('Error checando firmas', err);
            done();
        });
}
module.exports = {
    notification : checkFirmaSchedule
};
