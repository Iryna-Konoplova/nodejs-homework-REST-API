const { NotFound, BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const reVerify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound('User not found')
  }

  if (user.verifyToken === null) {
    throw new BadRequest('Verification has already been passed')
  }

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${user.verifyToken}'>Нажмите для подтверждения email</a>`
  }
  await sendMail(mail)

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = reVerify;
