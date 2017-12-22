const color = require('./color.js')
const room = {
  name: '聊天室'
}
var usernumber = 0


module.exports = function (server) {
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    var userIsAdd = false
    // 聊天信息
    // console.log('connect')
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
        return
      userIsAdd = true;
      ++usernumber
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
      // console.log('disconnect')
      if (userIsAdd) {;
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
