const room = {
  name: '聊天室'
}
var usernumber = 0

module.exports = function (server) {
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    var userIsAdd = false
    socket.on('chat', (msg, userInfo) => {
      var msg = {
        type: 'chat',
        userInfo: userInfo,
        msg: msg,
        time: Date.now()
      }
      socket.userInfo = userInfo
      io.emit('chat', msg)
    })

    // 新增用户
    socket.on('add user', userInfo => {
      if (userIsAdd)
        return

      userIsAdd = true;
      ++usernumber
      socket.userInfo = userInfo
      var msg = {
        type: 'info',
        msg: userInfo.name + ' 进入了' + room.name
      }
      io.emit('usernumber', usernumber)
      socket.broadcast.emit('chat', msg)
    })

    // 断开连接
    socket.on('disconnect', () => {
      if (userIsAdd) {;
        --usernumber
        var msg = {
          type: 'info',
          msg: socket.userInfo.name + ' 离开了' + room.name
        }
        io.emit('usernumber', usernumber)
        socket.broadcast.emit('chat', msg)
      }
    })

  })
}
