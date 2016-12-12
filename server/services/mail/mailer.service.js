const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const auth = {
  auth: {
    api_key: 'key-f5feaa343a8135fd12d4f7fe11fa42c0',
    domain: 'susanarivera.me'
  }
};
const nodemailerMailgun = nodemailer.createTransport(mailgun(auth));

const options = {
    from: 'contabilidad@susanarivera.me',
    subject : 'Vencimiento de Certificado'
};

function send(mailOptions) {
nodemailerMailgun.sendMail(Object.assign({},options,mailOptions), (err, info) => {
  if (err) {
    console.log('Error: ' + err);
  }
  else {
    console.log('Response: ' + info.message);
  }
});
}

module.exports = {
	send      : send
};
