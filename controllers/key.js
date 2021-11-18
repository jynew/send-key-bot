// 导入模型
const Key = require('../models/key')
const mailer = require('../mailer')

module.exports = {

    async getAllKeys(ctx, next) {
        try {
            const data = await Key.findAll()
            ctx.body = { msg: 1001, data }
        } catch (err) {
            ctx.body = { code: -1, msg: 1000, }
        }
        await next();
    },

    async createKey(ctx, next) {
        const req = ctx.request.body
        if (!req.key) {
            ctx.body = { code: -1, msg: 1002 }
            return await next();
        }
        try {
            const data = await Key.createKey(req)
            ctx.body = { msg: 1003, data }
        } catch (err) {
            ctx.body = { code: -1, msg: 1000 }
        }
        await next();
    },

    async sendKey(ctx, next) {
      const req = ctx.request.body
      if (req.user && req.email) {
          try {
              const { id, key } = await Key.findByEmail(null)
              const data = await Key.updateById({ id, ...req})
              await mailer(req.email, key)
              ctx.body = { msg: 1006 }
          } catch (err) {
              ctx.body = { code: -1, msg: 1000 }
          }
      } else {
          ctx.body = { code: -1, msg: 1002 }
      }
      await next();
    },

    async deleteById(ctx, next) {
        const query = ctx.request.query // 获取get请求参数
        if (query && query.id) {
            try {
                await Key.deleteById(query.id)
                ctx.body = { msg: 1005 }
            } catch (err) {
                ctx.body = { code: -1, msg: 1000 }
            }
        } else {
            ctx.body = { code: -1, msg: 1002 }
        }
        await next();
    }
}