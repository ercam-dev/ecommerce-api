const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_ACCOUNT,
        pass: process.env.GOOGLE_SECRET_APP,
    }
});

const sendResetPasswordMail = async (email, userId, token) => {
  const message = {
    from: process.env.GOOGLE_ACCOUNT,
    to: email,
    subject: 'Prueba Academlo',
    html: `<h1>Restablecer tu contraseña</h1> 
    <a href="http://localhost:3000/update-password?user=${userId}&token=${token}">Da click aquí para restablecer tu contraseña</a>`
  }
  // try {
    const info = await transporter.sendMail(message);
    console.log(info);
    return info;
  // } catch (error) {
  //   console.log("email could not be sent");
  // }
}

//export default enviarCorreo
module.exports = {
  sendResetPasswordMail
}; 
