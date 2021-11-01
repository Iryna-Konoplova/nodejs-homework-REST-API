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


// const sgMail = require('@sendgrid/mail')
// const { InternalServerError } = require('http-errors')
// const { SENDGRID_API_KEY, SENDGRID_SENDER } = process.env

// sgMail.setApiKey(SENDGRID_API_KEY)

// const sendMail = async (data) => {
//   try {
//     const mail = { ...data, from: SENDGRID_SENDER }
//     await sgMail.send(mail)
//     return true
//   } catch (error) {
//     throw new InternalServerError(error.message)
//   }
// }

// module.exports = sendMail