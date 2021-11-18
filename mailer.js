const nodemailer = require('nodemailer')

const mailer = (to, key) => {
  const transporter = nodemailer.createTransport({
    service: "QQ",
    auth: {
        user: '',
        pass: ''
    }
  })

  const receiver = {
      from: ``,
      subject: '',
      to: to,
      html: 
      ``
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(receiver, (error, info) => {
      error ? reject(error) : resolve(info.response)
      transporter.close()
    })
  })
}

module.exports = mailer
