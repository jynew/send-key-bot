const nodemailer = require('nodemailer')

const mailer = (to, key) => {
  const transporter = nodemailer.createTransport({
    service: "QQ",
    auth: {
        user: '286882998@qq.com',
        pass: 'iphgtizkxnbmbiif'
    }
  })

  const receiver = {
      from: `"发码机器人"<286882998@qq.com>`,
      subject: '金庸群侠传3D重制steam激活码',
      to: to,
      html: `<b>您的steam激活码为：${key}，请谨慎保管。</b>`
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(receiver, (error, info) => {
      error ? reject(error) : resolve(info.response)
      transporter.close()
    })
  })
}

module.exports = mailer