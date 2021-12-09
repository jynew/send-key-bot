const router = require('koa-router')()
const Key = require('../controllers/key')

router.get('/getAllKeys', Key.getAllKeys)

router.get('/getAllEmptyKeysCount', Key.getAllEmptyKeysCount)

router.post('/createKey', Key.createKey)

router.post('/sendKey', Key.sendKey)

router.get('/deleteById', Key.deleteById)

module.exports = router
