const router = require('koa-router')();
const fs = require('fs')
const path = require('path')
var test = require('./api/test')

router.get('/', ctx => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream(path.join(__dirname, '../pages/index.html'))

})
router.use('/api/test', test.routes(), test.allowedMethods())
module.exports = router
