const router = require('koa-router')()
var users = require('../models/users')
router.get('/', async ctx => {
  var result = 1
  await users.find({
    age: 14
  }, function (err, docs) {
    if (err) {
      result = err
    } else {
      result = docs
    }
  })
  console.log(result)
  ctx.body = result
})

module.exports = router
