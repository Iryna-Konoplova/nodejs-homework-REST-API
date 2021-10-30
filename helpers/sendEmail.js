const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const newEmail = {
    ...data,
    from: 'a.irina773@gmail.com'
  }
  try {
    await sgMail.send(newEmail);
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail
