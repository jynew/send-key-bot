const router = require('koa-router')()
const Question = require('../controllers/question')

router.get('/getAllQuestions', Question.getAllQuestions)

router.post('/createQuestion', Question.createQuestion)

router.post('/isCorrect', Question.isCorrect)

module.exports = router
