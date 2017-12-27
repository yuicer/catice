const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const serverStatic = require('koa-static')
const router = require('./server')

const app = new Koa()
const server = require('http').createServer(app.callback())

require('./chat')(server)


app
  .use(serverStatic(path.join(__dirname, 'static')))
  .use(router.routes())
  .use(router.allowedMethods())

  // err handler
  .use(async ctx => {
    if (200 != ctx.status) {
      ctx.body = ctx.status
    }
  })

server.listen(3000)
