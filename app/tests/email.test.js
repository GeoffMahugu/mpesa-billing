import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: 'geoffreymahugu@gmail.com',
  subject: 'Second Email Testing',
  text: 'Greetings from the team, you got this message from Mpesa Billing.',
  html: '<p>Greetings from the team, you got this message from Mpesa Billing.</p>',
};

try {
  await transporter.sendMail(mailOptions);
  console.log('Email sent successfully');
} catch (error) {
  console.error('Error sending email:', error);
}
