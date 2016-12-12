const Firma = require('../api/firma/firma.model').Firma;
const mailService = require('../services/mail/mailer.service');
const moment = require('moment');
function checkFirmaSchedule (job, done) {
    return Firma.find({
        'enviado':false
    })
        .populate('cliente empleado')
        .exec()
        .then(firmas => {
            if (!firmas) return done();
            let count = 0;
            firmas = _.filter(firmas, firma => {
                return Math.abs(moment().diff(moment(firma.fecha_notificacion),'hours')) < 2;
            });
            if(!firmas.length > 0) return done();
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
