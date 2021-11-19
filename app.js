const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const cors = require('koa-cors')
const RateLimit = require('koa2-ratelimit').RateLimit;

const key = require('./routes/key')
const question = require('./routes/question')

const limiter = RateLimit.middleware({
  interval: { min: 1 },
  max: 5
})

app.use(limiter)

// midwares
const { loggerMiddleware } = require('./midwares/logger')
const { responseHandler, errorHandler } = require('./midwares/response')

// config
const config = require('./config')

// error handler
onerror(app)

app.use(loggerMiddleware)
app.use(errorHandler)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(path.resolve(__dirname, config.publicPath)))

// routes
app.use(key.routes(), key.allowedMethods())
app.use(question.routes(), question.allowedMethods())

app.use(responseHandler)

// cors
app.use(cors())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
