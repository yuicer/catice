const color = require('./color.js')
const room = {
  name: '聊天室'
}
var usernumber = 0


module.exports = function (server) {
  const io = require('socket.io')(server)

  io.on('connection', socket => {

    socket.on('disconnect', () => {
      var msg = {
          type: 'info',
          msg: socket.userName + ' 离开了' + room.name
        }
        --usernumber
      io.emit('usernumber', usernumber)
      socket.broadcast.emit('chat', msg)
    })

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

    socket.on('add user', user => {
      socket.userName = user
      socket.userColor = color.getcolor()
      var msg = {
          type: 'info',
          msg: user + ' 进入了' + room.name
        }
        ++usernumber
      io.emit('usernumber', usernumber)
      socket.broadcast.emit('chat', msg)
    })

  })
}