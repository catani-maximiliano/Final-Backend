const nodemailer = require('nodemailer')

const {
  emailService,
  emailPort,
  emailUser,
  emailPass,
} = require('../config/email.config')

/**Se utiliza el método createTransport del módulo nodemailer para crear un objeto de transporte de correo electrónico.
El objeto de transporte se crea con la configuración especificada en el argumento del método createTransport.

La configuración incluye los siguientes campos:

service: Especifica el servicio de correo electrónico que se utilizará para enviar los correos. Puede ser un servicio como
 Gmail, Outlook, etc.
port: Especifica el número de puerto que se utilizará para enviar los correos electrónicos.
auth: Especifica las credenciales de autenticación para acceder a la cuenta de correo electrónico desde la cual se 
enviarán los correos.
user: Especifica el nombre de usuario o la dirección de correo electrónico.
pass: Especifica la contraseña de la cuenta de correo electrónico. */
const transport = nodemailer.createTransport({
  service: emailService,
  port: emailPort,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
})

module.exports = transport