// 日志打印中间件
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const config = require('../config');

// 这个是判断是否有 logs 目录，没有就创建。
const logPath = path.resolve(config.logPath)
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

// 配置 log4js
log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: { type: 'colored' }
        },
        production: {
            type: 'dateFile',
            filename: path.resolve(logPath,config.logFilename),
            pattern: '-yyyy-MM-dd',  
            layout: { type: 'colored' }
        }
    },
    categories: {
        default: {
            appenders: ['console', 'production'],
            level: 'debug'
        },
        anything: {
            appenders: ["console"],
            level: "info"
        }
    }
});

const logger = log4js.getLogger('[Default]');
// logger.info('this is a info');
// logger.debug("debug")
// logger.error("error")
// logger.fatal("fatal")asdf
/**
 * logger中间件
 * @param ctx { Any } [ Koa Context 将 node 的 request 和 response 对象封装在一个单独的对象里面，其为编写 web 应用和 API 提供了很多有用的方法 ]
 * @param next { Any } [ 下一个中间件函数，也就是每一个中间件如果要往下走必须写上这个，否则无法执行 ]
 * @returns {Promise<void>}
 */

const loggerMiddleware = async (ctx, next) => {
    console.log('打印日志信息');
    // 开始时间
    const start = new Date();
    await next();
    // 结束时间
    const ms = new Date() - start;
    // 打印出请求的参数
    const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips || (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)));
    let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`;
    logger.info(logText);
};

module.exports = { logger, loggerMiddleware };
