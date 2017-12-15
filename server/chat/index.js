const color = require('./color.js')
const room = {
  name: '聊天室'
}
var usernumber = 0
var userIsAdd = false


module.exports = function (server) {
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    // 聊天信息
    socket.on('chat', msg => {
      var msg = {
        type: 'chat',
        name: socket.userName,
        msg: msg,
        color: socket.userColor,
        time: Date.now()
      }
      io.emit('chat', msg)
    })

    // 新增用户
    socket.on('add user', user => {
      if (userIsAdd)
        return ++usernumber
      userIsAdd = true
      socket.userName = user
      socket.userColor = color.getcolor()
      var msg = {
        type: 'info',
        msg: user + ' 进入了' + room.name
      }
      io.emit('usernumber', usernumber)
      socket.broadcast.emit('chat', msg)
    })

    // 断开连接
    socket.on('disconnect', () => {
      if (userIsAdd) {
        --usernumber
        var msg = {
          type: 'info',
          msg: socket.userName + ' 离开了' + room.name
        }
        io.emit('usernumber', usernumber)
        socket.broadcast.emit('chat', msg)
      }
    })

  })
}