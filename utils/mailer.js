// utils/mailer.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro provedor
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"CelebraJá" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
  }
}

module.exports = { sendEmail };
