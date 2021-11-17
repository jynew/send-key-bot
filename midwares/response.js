// 响应及异常处理中间件
const { logger } = require('./logger');
const msgConfig = require('../config/msg')
// 这个中间件用于将 ctx.result 中的内容最终传给客户端
const responseHandler = ctx => {
    console.log('=========ctx.body============');
    console.log(ctx.body);
    console.log('=========ctx.body============');
    let body = ctx.body
    if (body !== undefined) {
        ctx.type = 'json';
        ctx.body = {
            code: !body.code ? 200 : body.code,
            msg: !body.msg ? 'success' : msgConfig[body.msg],
            data: !body.data ? null : body.data
        };
    }
}

// 这个中间件处理在其它中间件中出现的异常,我们在next()后面进行异常捕获，出现异常直接进入这个中间件进行处理
const errorHandler = (ctx, next) => {
    return next().catch(err => {
        console.log('==========ERRRRRRROR==========');
        console.log('==========ERRRRRRROR==========');
        if (err.code == null) {
            logger.error(err.stack);
        }
        ctx.body = {
            code: err.code || -1,
            msg: err.message.trim() + 'from errorHandler',
            data: null
        };
        // 保证返回状态是 200
        ctx.status = 200;
        return Promise.resolve();
    });
};

// 代码的后面会暴露出responseHandler和errorHandler,responseHandler正确响应.
// 我们在业务中，只需要对ctx.result进行写入即可。
// 这个中间件可以放在所有中间件的最后面，这样可以保证前面中间件都需要经过它，再返回前端。
// errorHandler错误响应，这个主要是用来进行出错或者异常的捕获，可以返回响应给前端，要不前端会出现一直padding的状态直到超时。
module.exports = { responseHandler, errorHandler };
