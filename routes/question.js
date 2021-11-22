const router = require('koa-router')()
const Question = require('../controllers/question')
const RateLimit = require('koa2-ratelimit').RateLimit

const createAccountLimiter = RateLimit.middleware({
  interval: { hour: 1 },
  delayAfter: 1,
  timeWait: 3 * 1000,
  max: 3,
  message: "答题过多，请一个小时之后再答"
})

router.get('/getAllQuestions', Question.getAllQuestions)

router.post('/createQuestion', Question.createQuestion)

router.post('/isCorrect', createAccountLimiter, Question.isCorrect)

module.exports = router
