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
    if (404 == ctx.status) {
      ctx.type = 'text/html'
      ctx.body = fs.createReadStream(path.join(__dirname, 'pages/error.html'))
    }
  })

server.listen(3000)
